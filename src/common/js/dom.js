export function addClass(el, className) {
    if(hasClass(el, className)) {
        return;
    }
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}

export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}

export function removeClass(el, className) {
    if(!hasClass(el, className)){
        return;
    }

    let newClass = el.className.split(' ');
    newClass.forEach((item, index) => {
        if(item === className) {
            newClass.splice(index, 1);
        }
    })
}