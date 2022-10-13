let Router = function() {
    this.GET = {};
    this.POST = {};
    this.bind = function (route, type, fn) {
        if (type === 'GET') {
            this.GET[`${route}`] = fn;
        }
        if (type === 'POST') {
            this.POST[`${route}`] = fn;
        }
    };
    this.runRequest = function (a ,b) {
        if (this.GET[a] && b === 'GET') {
            if (this.GET[a]) {
                return this.GET[a]();
            }
        } else if (this.POST[a] && b === 'POST') {
            if (this.POST[a]) {
                return this.POST[a]();
            }
        } else {
            return 'Error 404: Not Found';
        }
    }
}
let router = new Router();
console.log(router);
router.bind('/hello', 'GET', function() { return 'hello world'; });
router.bind('/login', 'GET', function() { return 'Please log-in.'; });
router.bind('/vote', 'POST', function() { return 'Voted.'; });
console.log(router);
console.log(router.runRequest('/hello', 'GET'))
console.log(router.runRequest('/login', 'GET'))
console.log(router.runRequest('/vote', 'POST'))
console.log(router.runRequest('/sdsd', 'POST'))
