var list = document.querySelectorAll('.component--feedback .labels li');
list.forEach(function (li) {
  return li.addEventListener('click', function (evt) {
    var target = evt.currentTarget,
        input = target.querySelector('input'),
        messageBox = target.parentNode.nextElementSibling;

    if (messageBox.className === 'labels-text') {
      messageBox = messageBox.nextElementSibling;
    }

    if (evt.currentTarget.classList.contains('active')) {
      target.classList.remove('active');
      messageBox.classList.remove('active');
      input.checked = false;
    } else {
      input.checked = true;
      list.forEach(function (li) {
        return li.classList.remove('active');
      });
      target.classList.add('active');
      messageBox.classList.add('active');
    }
  });
});
document.querySelectorAll('.close-btn').forEach(function (btn) {
  return btn.addEventListener('click', function (e) {
    var parent = e.currentTarget.parentNode;
    parent.classList.add('hide'); // parent.parentNode.removeChild(parent);

    e.preventDefault();
  });
});