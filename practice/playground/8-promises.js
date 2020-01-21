const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([7, 4, 1])
        reject('Things went wrong!')
    }, 2000)
})

doWorkPromise
    .then((result) => {
        return httpReq(result[0])            
    })
    .then((user) => {
        console.log('user: ', user);
    })
    .catch((error) => {
        console.log('Error!', error)
    })

//
//                               fulfilled
//                              /
// Promise      -- pending --> 
//                              \
//                               rejected
//