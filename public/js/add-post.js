async function newFormHandler(event){
    event.preventDefault();
    //selecting the value of the form in create-post handlebars
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('input[name="post-content"]').value;

    const response = await fetch(`api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            //sending the user's values as the body 
            title,
            post_content
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    });
    if(response.ok){
        //returns user to home if post is added
        document.location.replace('/dashbord');
    } else{
        alert(response.statusText);
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);