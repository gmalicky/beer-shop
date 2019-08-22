document.addEventListener('click', () => {
    if (event.target.matches("[id^='add']") || event.target.matches("[id^='del']")) {
        const task = event.target.id.match(/[a-z]*/);
        const num = event.target.id.match(/\d+/);
        fetch('/update/' + task[0] + '/' + num[0])
            .then((response) => {
                response.text().then((res) => {
                    document.documentElement.innerHTML = res;
                });
            })
            .catch((err) => console.log(err));
    }

    if (event.target.matches("[id^='cart']")) {
        const num = event.target.id.match(/\d+/);
        fetch('/add/' + num[0])
            .then((response) => {
                
            })
            .catch((err) => console.log(err));
    }

    if (event.target.matches('#complete_order')) {
        fetch('/complete')
            .then((response) => {
                response.text().then((res) => {
                    document.getElementById('content').innerHTML = res;
                });
            })
            .catch((err) => console.log(err));
    }

    if (event.target.matches('#search_order')) {
        const orderNum = document.getElementById('order_input').value;
        if (orderNum.match(/^\d{5}$/)) {
            window.location.href = '/order/' + orderNum;
        } else {
            document.getElementById('order_input').value = '';
            document.getElementById('order_input').placeholder = 'Wrong format';
        }
    }

    if (event.target.matches("[id^='remove_order']")) {
        const orderNum = event.target.id.match(/\d+/);
        fetch('/delete/' + orderNum[0])
            .then((response) => {
                response.text().then((res) => {
                    document.getElementById('content').innerHTML = res;
                });
            })
            .catch((err) => console.log(err));
    }
});
