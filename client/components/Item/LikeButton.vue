<template>
    <button 
    @click="likePost"
    >
        {{content}}
    </button>
</template>

<script>
export default {
    name: 'LikeButton',
    props: {
        entry: {
        type: Object,
        required: true
        }
    },
    data() {
        return {
        liked: false,
        content: '❤️ Like',
        };
    },
    methods: {
        likePost() {
            /**
             * Toggles on a like on this post.
             */
            if (!this.liked) {
                this.liked = true;
                this.content = '❤️ Liked'
            const params = {
                method: 'POST',
                message: 'Successfully liked entry!'
            };
            this.like(params);
            } else {
                this.liked = false;
                this.content = '❤️ Like';
            const params = {
                method: 'DELETE',
                message: 'Successfully unliked entry!'
            };
            this.like(params);
            }
        },
        async like(params) {
            /**
             * Submits a like request to the like endpoint.
             * @param params - Options for the request
             * @param params.body - Body for the request, if it exists
             */
            const options = {
                method: params.method, headers: {'Content-Type': 'application/json'}
            };
            if (params.body) {
                options.body = params.body;
            }

            try {
                const r = await fetch(`/api/likes/${this.entry._id}`, options);
                if (!r.ok) {
                const res = await r.json();
                throw new Error(res.error);
                }
                params.callback();
            } catch (e) {
            }
        },
    }
}
</script>