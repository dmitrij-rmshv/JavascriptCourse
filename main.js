function my_initiation() {
  
  var wh_brd = document.createElement("div");
  wh_brd.className = "whole_board";
  wh_brd.setAttribute('id', 'whole_brd');
  document.body.append(wh_brd);
  
  var nums = document.createElement('div');
  nums.setAttribute('id', 'nums_col');
  nums.className = 'num_col';
  whole_brd.appendChild(nums);
  
  var _ = document.createElement('div');
  _.className = '_';
  nums_col.appendChild(_);
  
  for (var i = 8; i > 0; i--) {
    var number = document.createElement('div');
    number.className = 'number'
    number.innerText = i;
    nums_col.appendChild(number);
  }
  
  var b64 = document.createElement('div');
  b64.setAttribute('id', 'board64');
  b64.className = 'board64';
  whole_brd.appendChild(b64);
  
  var letters = document.createElement('div');
  letters.setAttribute('id', 'letter_line');
  letters.className = 'letter_line';
  board64.appendChild(letters);
  
  for (var char of 'ABCDEFGH') {
    var letter = document.createElement('div');
    letter.className = 'letter';
    letter.innerText = char;
    letter_line.appendChild(letter);
  }
  
  var wht_fld = document.createElement('div');
  wht_fld.className = 'white_field';
  
  var blk_fld = document.createElement('div');
  blk_fld.className = 'black_field';
  
  
  for (var field = 0; field < 64; field++) {
    if (((field - field % 8) / 8) % 2) {
      if (field % 2) {
        var wht_fld = document.createElement('div');
        wht_fld.className = 'white_field';
        board64.appendChild(wht_fld);
      } else {
        var blk_fld = document.createElement('div');
        blk_fld.className = 'black_field';
        board64.appendChild(blk_fld);
      }  
    } else {
      if (field % 2) {
        var blk_fld = document.createElement('div');
        blk_fld.className = 'black_field';
        board64.appendChild(blk_fld);
      } else {
        var wht_fld = document.createElement('div');
        wht_fld.className = 'white_field';
        board64.appendChild(wht_fld);
      }
    }
  }  
  
}

window.onload = my_initiation;