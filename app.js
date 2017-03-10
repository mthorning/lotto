var runDraws = function(lotterySetup) {
    
  var win, count, j, ticketPurchased, testStatus;
  var lottoDraw = [];
  var results = [];
  var avg = sum = 0;
  
  return function(testsToRun, ticket) {
    j = 0;

    //check if ticket numbers have been provided
    if(ticket) {
      //sort the arrays for comparison
      console.log(ticket);
      ticket.sort(function(a, b) {return a - b;});
      lotterySetup.sort(function(a, b) {return a - b;});
      //check whether each ball is less than the maximum number allowed
      ticketPurchased = ticket.every(function(ball, index) {
        return ball <= lotterySetup[index];
      });
    }

    ticketPurchased? testStatus = 'ticket' : testStatus = 'consecutive';

    while(j < testsToRun) {

      //reset variables
      count = 0;
      win = false;

      //this is one test
      //-------------------------------
      while(win === false) {
        lottoDraw = [];
        count++;

        let i = 0;
        while(i < lotterySetup.length) {
          var rand = (Math.floor(Math.random() * (lotterySetup[i] - 1)) + 1);
          if(lottoDraw.indexOf(rand) === -1) {
            lottoDraw.push(rand);
            i++;
          }
        }

        //sort the balls
        lottoDraw.sort(function(a, b) {return a - b;});

        //are we looking for consecutive or ticket numbers?
        if(ticketPurchased) {
          win = lottoDraw.every(function(ball, index) {
            return ball === ticket[index];
          });
        } else {
          //are the numbers drawn consecutive?
          if(lottoDraw[lottoDraw.length - 1] - lottoDraw[0] === lotterySetup.length - 1) {
            win = true;
          }
        }
      }
      //end of one test
      //----------------------------------
      results.push(count);
      j++;
    }
    //return result of tests
    results.forEach(function(result) {
      return sum += result;
    });
    avg = Math.round(sum / results.length);
    

    document.getElementById('output').innerHTML += '<li> Testing ' + whichLottery + ' for ' + testStatus + ' numbers. Average number of draws out of ' + testsToRun + ' tests to hit a winning number is ' + avg.toLocaleString() + '</li>';
  }
}

var whichLottery, haveTicket, numberOfTests, a;
var lotto = runDraws([59, 59, 59, 59, 59, 59]);
var euromillions = runDraws([50, 50, 50, 50, 50, 12, 12]);

var lottoTicket = [3, 13, 25, 35, 37, 40]
var euromillionsTicket = [12, 18, 22, 33, 35, 3, 8];

document.getElementById('runTests').addEventListener('mousedown', function(event) {
  event.target.textContent = 'Testing...';

  whichLottery = document.querySelector('select[name="whichLottery"]').value;
  haveTicket = document.querySelector('select[name="haveTicket"]').value;
  numberOfTests =document.querySelector('input[name="number"]').value;
});

document.getElementById('runTests').addEventListener('mouseup', function(event) {
  if(whichLottery === 'lotto') {
    haveTicket ? a = lottoTicket : a = '';
    lotto(numberOfTests, a);
  } else {
    haveTicket ? a = euromillionsTicket : a = '';
    euromillions(numberOfTests, a);
  }
  event.target.textContent = 'Run Tests';
});

