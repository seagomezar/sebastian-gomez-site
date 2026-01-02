import json
import sys

def get_post_content(slug):
    try:
        with open('posts_data.json', 'r') as f:
            data = json.load(f)
            
        posts = data.get('posts', [])
        for post in posts:
            if post['slug'] == slug:
                return post
        return None
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_post.py <slug>")
        sys.exit(1)
    
    slug = sys.argv[1]
    post = get_post_content(slug)
    if post:
        print(json.dumps(post, indent=2))
    else:
        print(f"Post with slug '{slug}' not found.")
