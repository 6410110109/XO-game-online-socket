const socket = io()

const create_level = () => {
    let obj = document.getElementById('table')
    let width = 500
    let height = 500
    for (let i = 0; i < 9; i++) {
        let hold = document.createElement('div')
        hold.setAttribute('class', 'hold')
        hold.setAttribute('id', 'hold' + i)
        hold.setAttribute('onclick', `click_hold(this)`)
        hold.setAttribute('isClick', false)
        hold.style.width = width / 3  + 'px'
        hold.style.height = height / 3 + 'px'
        hold.style.outline = '1px solid rgb(182, 182, 182)'
        hold.style.cursor = 'pointer'
        obj.appendChild(hold)
    }

}

let win_state = [
    [
        1, 1, 1,
        0, 0, 0,
        0, 0, 0
    ],
    [
        0, 0, 0,
        1, 1, 1,
        0, 0, 0
    ],
    [
        0, 0, 0,
        0, 0, 0,
        1, 1, 1
    ],
    [
        1, 0, 0,
        1, 0, 0,
        1, 0, 0
    ],
    [
        0, 1, 0,
        0, 1, 0,
        0, 1, 0
    ],
    [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ],
    [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ],
    [
        0, 0, 1,
        0, 1, 0,
        1, 0, 0
    ],
]

let X_count = 0
let O_count = 0
let pass = false
let click = 0

const check_win = () => {

    pass = false


    for (let i = 0; i < win_state.length; i++) {

        if (pass) {
            break
        }

        X_count = 0
        O_count = 0

        for (let j = 0; j < document.querySelectorAll('.hold').length; j++) {
            let text = document.querySelectorAll('.hold')[j].children[0]
            if (text) {
                if (win_state[i][j] === 1) {
                    if (text.innerHTML === "X") {
                        X_count += 1
                    } else {
                        O_count += 1
                    }

                    if (X_count === 3 || O_count === 3) {
                        pass = true
                        break
                    }

                }


            }
        }


    }

    if (pass) {
        if (X_count > O_count) {
            alert("X win!!")
            window.location.reload()
        } else if (X_count < O_count) {
            alert("O win!!")
            window.location.reload()
        }
    } else {
        if (click >= 9) {
            alert("Draw!!")
            window.location.reload()
        }
    }


}

let turn = "O"

const click_hold = (e) => {

    if (e.getAttribute('isClick') === 'false') {
        click += 1
        socket.emit('send_data', e.id)
        let label = document.createElement('p')
        label.style.color = turn === "O" ? "#000" : "red"
        label.innerText = turn
        e.appendChild(label)
        e.setAttribute('isClick', true)
        turn = turn === "O" ? "X" : "O"
        setTimeout(() => {
            check_win()
        }, 100);
    }

}

socket.on('send_data', data => {
    let hold = document.getElementById(data)
    click_hold(hold)
})

window.onload = () => {
    create_level()
}

