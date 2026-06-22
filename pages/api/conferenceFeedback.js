import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// Spam-protection thresholds.
const MIN_FILL_MS = 2500; // submissions faster than a human can read + fill
const MAX_NAME_LEN = 100;
const MAX_COMMENT_LEN = 2000;

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

export default async function asynchandler(req, res) {
  const {
    userName, comment, score, slug, website, renderedAt,
  } = req.body || {};

  // Honeypot: a real user never fills the hidden `website` field. Pretend success
  // so bots don't retry, but skip the mutation.
  if (isNonEmptyString(website)) {
    return res.status(200).send({ ok: true });
  }

  // Timing: submissions arriving faster than a human could fill the form are bots.
  // Return a fake success rather than an error so a mis-timed real user isn't blocked.
  const elapsed = Date.now() - Number(renderedAt);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return res.status(200).send({ ok: true });
  }

  // Required fields.
  if (!isNonEmptyString(userName) || !isNonEmptyString(comment) || !isNonEmptyString(slug)) {
    return res.status(400).send({ error: 'Todos los campos son obligatorios.' });
  }

  // Length limits.
  if (userName.length > MAX_NAME_LEN || comment.length > MAX_COMMENT_LEN) {
    return res.status(400).send({ error: 'Uno de los campos excede el largo permitido.' });
  }

  // Score is server-authoritative: coerce and range-check (never trust the client).
  const parsedScore = parseInt(score, 10);
  if (Number.isNaN(parsedScore) || parsedScore < 1 || parsedScore > 5) {
    return res.status(400).send({ error: 'La calificación debe estar entre 1 y 5.' });
  }

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateConferenceFeedback($userName: String!, $comment: String!, $score: Int!, $slug: String!) {
      createConferenceFeedback(data: {userName: $userName, comment: $comment, score: $score, conference: {connect: {slug: $slug}}}) { id }
    }
  `;

  try {
    const result = await graphQLClient.request(query, {
      userName: userName.trim(),
      comment: comment.trim(),
      score: parsedScore,
      slug: slug.trim(),
    });

    return res.status(200).send(result);
  } catch (error) {
    // Log server-side for debugging, but never leak CMS internals to the client.
    console.log(error);
    return res.status(500).send({ error: 'No se pudo enviar el feedback. Intenta de nuevo.' });
  }
}
