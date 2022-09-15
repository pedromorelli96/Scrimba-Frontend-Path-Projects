const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21,
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4,
    },
    {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment:
            "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152,
    },
];

const postsEl = document.getElementById("posts");

function renderPost(postItem) {
    postsEl.innerHTML += postItem;
}

function generatePosts(posts_array) {
    let postItem = "";
    for (const post of posts) {
        postItem = `
            <section id="post">
                <div class="post-header">
                    <img
                        class="post-header-avatar"
                        src=${post.avatar}
                        alt="avatar of user post"
                    />
                    <div class="post-header-text">
                        <div>
                            <span class="post-header-name">${post.name}</span>
                        </div>
                        <div>
                            <span class="post-header-location">${post.location}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <img
                        class="post-img"
                        src=${post.post}
                        alt="post image"
                    />
                </div>

                <div class="post-footer">
                    <div class="post-footer-icons">
                        <img
                            class="post-footer-icon"
                            id="heart-icon"
                            src="images/icon-heart.png"
                            alt="heart icon"
                        />
                        <img
                            class="post-footer-icon"
                            src="images/icon-comment.png"
                            alt="comment icon"
                        />
                        <img
                            class="post-footer-icon"
                            src="images/icon-dm.png"
                            alt="direct message icon"
                        />
                    </div>
                    <div>
                        <span class="post-footer-likes">${post.likes} likes</span>
                    </div>
                    <div>
                        <span class="post-footer-username">${post.username}</span>
                        <span class="post-footer-comment">${post.comment}</span>
                    </div>
                </div>
            </section>
        `;

        renderPost(postItem);
    }
}

generatePosts();
