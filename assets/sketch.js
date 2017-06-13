/*

*/


LIMIT = 10000;
PRIMES = primes_lt(LIMIT);
NUM = 2;
prev_num = 5;

function setup() {
  createCanvas(screen.width, window.innerHeight);
  clear();
  background(51);
  noLoop();
  textSize(15);
  input = createInput();
  document.addEventListener('input', redraw);
  input.position(20,20);
  input.value('enter a number < 10,000');
}
COLORS = ['#96ceb4','#ffeead','#ff6f69','#ffcc5c'];
Cidx = 0;
function get_color(){
    col = COLORS[Cidx];
    Cidx++;
    Cidx = Cidx % COLORS.length;
    return col;
}

function draw() {
  ellipseMode(RADIUS);
  clear()
  NUM = input.value();
  background(51)

  fill(get_color());
  ellipse(width/2, height/2,height/2, height/2);
  if(NUM > 1 && NUM < LIMIT + 1 && NUM % 1 === 0){
      sequence = factorize(NUM);
      //sequence.reverse();
      render_seq(sequence);
  }
}

function primes_lt(num){
    primes = new Array;
    for(var i=2; i < num; i++){
        found_factor = false;
        for( var j=0; j<primes.length; j++){
            if( i % primes[j] === 0){
                found_factor = true;
                break;
            }
        }
        if(found_factor === false){
            primes.push(i);
        }
    }
    return primes;
}

function factorize(num){
    factors = new Array;
    for(var idx=0; num !== 1; idx++){
        p = PRIMES[idx];
        while(num % p == 0){
            num = num / p;
            factors.push(p);
        }
    }
    return factors;
}

function render_seq(seq){
    porigins = [[width/2, height/2]];
    pRr = height/2;
    seq_len = seq.length;
    tt_base = 126 * 1.0 / seq_len;
    for(var n_idx = 0; n_idx < seq_len; n_idx++){
        fill(get_color());
        n = seq[n_idx];
        theta = 2*PI / n;
        R = pRr / (1 + sin(theta/2));
        r = R * sin(theta / 2);
        //console.log("n: ", n, " and pRr: ", pRr);
        porigins_len = porigins.length;
        if(n_idx + 1 === seq_len){
            fill(0)
//           fill(tt_base * (n_idx + 1));
        }
        //console.log("    ", porigins);
        for(var cent_idx = 0; cent_idx < porigins_len; cent_idx++){
            cent = porigins.shift();
            offsetx = cent[0];
            offsety = cent[1];
            //console.log("   cent: ", cent, " of ", porigins_len);
            for(var i=1; i<=n; i++){
               //console.log("        i: ", i);
               new_cent = [offsetx + (R * cos(theta * i)), offsety + (R * sin(theta * i))];
               ellipse(new_cent[0], new_cent[1], r, r);
               porigins.push(new_cent);
            }
        }
        //console.log("    ", porigins);
        pRr = r;
    }

}
