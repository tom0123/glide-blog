let posts = [];
// GET, POST, PUT, PATCH, DELETE, OPTIONS

$('.home').on('click', () => {
    getPosts();
});

$('.community').on('click', () => {
    getPosts('community');
});

$('.press').on('click', () => {
    getPosts('press');
});

function getPosts(filter) {

    if (filter === undefined || filter === '') {
        axios.get('api.php?function=posts').then(
            response => {
                let data = response.data;
                posts = data.posts;

                $('.active').removeClass('active');
                $('.home').addClass('active');

                $('.posts').empty();
                posts.forEach((post, index) => {
                    addPost(post);
                });
            }
        );
    } else {
        axios.get('api.php?function=posts&filter=' + filter).then(
            response => {
                let data = response.data;
                posts = data.posts;

                $('.active').removeClass('active');
                $('.' + filter).addClass('active');

                $('.posts').empty();
                posts.forEach((post, index) => {
                    addPost(post);
                });
            }
        );
    }
}

getPosts();

function addPost(post) {
    let $post = $('#template').clone();
    $post.removeAttr('id');

    $post.find('.name').text(post.author.first_name + ' ' + post.author.last_name);
    $post.find('.date-text').text(new Date(post.date).toDateString());
    $post.find('.content .pre-body').html(post.excerpt);
    $post.find('.content .body').html(post.content);
    $post.find('.content .title').html(post.title);
    $post.find('.more-link').remove();

    $('.posts').append($post);
}

$(document).ready(() => {
    $('.body').hide();
    $(document.body).on('click', 'button', function () {
        let $post = $(this).closest('.post');
        let $prebody = $post.find('.pre-body');
        let $body = $post.find('.body');

        $prebody.toggle();
        $body.toggle();
    });
});