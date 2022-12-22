
export const PostInitModel =  {
    _id: '', 
    title: '', 
    description: '', 
    profile: { 
        name: '', 
        user: {
            user: ''
        },
        image: false,
        urlImage: ''
    },
    comments: [{
        _id: '',
        description: '',
        likes: [''],
        profile: {
            image: false,
            urlImage: '',
            _id: '',
            name: '',
            user: '',
        }
    }],
    likes: [''],
    image: false,
    urlImage: '',
    likedByUser: false
}
