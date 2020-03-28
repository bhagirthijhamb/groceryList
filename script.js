$(document).ready(function(){
    // SETUP
    let $list, $newItemForm, $newItemButton;
    let item = '';          // item is an empty string
    $list = $('ul');        // cache the unordered list
    $newItemForm = $('#newItemForm')             // cache form to add new Item
    $newItemButton = $('#newItemButton');        // cache button to show form

    // HIDE THE LIST
    // var $h2 = $('h2');
    // $('ul').hide();
    // $h2.append('<a class="show">show</a>');

    // $h2.on('click', function(){
    //     $h2.next().fadeIn(100);
    //     $h2.find('a').fadeOut();
    // });

    // ADD A THOUGHT FOR THE DAY
    $('ul').before('<p class="notice">A Smiling face looks more beautiful</p>');

    $('li').hide().each(function(index) {        // Hide list items
        $(this).delay(450 * index).fadeIn(1600); // Then fade them in
    })

    // CHANGE ATTRIBUTES TO ADD LOVE ICON
    $('li').addClass('favorite');               // Add favorite icon
    $('ul').attr('id', 'group');                // Add id attribute with value group that gives a border

    // UPDATE CSS
    var backgroundColor = $('li').css('background-color');
    $('ul').append('<p> Color used is: ' + backgroundColor + '</p>')
        .hide().fadeIn(5000);
    $('li').css({
        // 'background-color': '#cc8623',
        // 'border': '1px solid #000',
        // 'color': '#000',
        // 'font-family': 'Georgia',
        // 'padding-left': '+=75'
    });

    // EVENTS
    var ids = '';                           // create a variable ids ans set it to empty string 
    var $listItems = $('li');               // Cache the jQuery object containing reference to all list items

    $listItems.on('mouseover click', function(){    // create event lostener for mouse over  and click
        ids = this.id;                              // id of clicked/ mouseovered list item
        $listItems.children('span').remove();       // remove any span child of li items
        $(this).append(' <span class="priority">' + ids + '</span>'); // append a span with id of list item as its content
    });

    $listItems.on('mouseout', function(){           // on mouseout
        $(this).children('span').remove();          // remove the child that is a span
    });

    // EACH ELEMENT IN A SELCTION
    $('li').each(function(){
        $(this).append('<span class="order">' + ' -->' + '</span');
    })


    // ITEM COUNTER
    const updateCount = () => {                 // declare function
        const items = $('li[class!=complete]').length;  // Number of items in list
        console.log(items)
        $('#counter').text(items);
    }
    updateCount();

    // SETUP FORM FOR NEW ITEMS
    $newItemButton.show();                      // Show the buttom
    $newItemForm.hide();                        // Hide the form
    $('#showForm').on('click', () => {          // When new item clicked
        $newItemButton.hide();                  // Hide the buttom
        $newItemForm.show();                    // Show the form
    });

    //ADDING A NEW LIST ITEM
    $newItemForm.on('submit', function(e) {     // when a new item is submitted
        e.preventDefault();                     // Prevent form from being submitted
        const text = $('input:text').val();      // Get value of the text input
        $list.append('<li>' + text + '</li>');   //Ad item to end of the list
        $('input:text').val('');                // Empty the text input
        updateCount();                           // Update the count
    });

    // CLICK HANDLING - USES DELEGATION ON <UL> ELEMENT
    $list.on('click', 'li', function() {
        const $this = $(this);
        const complete = $this.hasClass('complete');  //Is item complete

        if(complete === true) {                     // Check if the item is complete
            $this.animate({                         // If so, animate opacity + padding
                opacity: 0.0, 
                paddingLeft: '+=180'
            }, 500, 'swing', function() {           // Use callback when animation completes
                $this.remove();                     // Then completely remove this item 
            });             
        } else {                                    // Otherwise indicate it ia complete
            item = $this.text()                     // Get the text from the list item
            $this.remove();                         // remove the list item
            $list                                   // Add back to end of list as complete
                .append('<li class=\"complete\">' + item + '</li>')
                .hide().fadeIn(300);                // Hide it so it can be faded in
            updateCount();                          // Update the counter
        }                                           // End of else option
    })                                              // End of event handler

    // 
    var $window = $(window);
    var $slideAd = $('#slideAd');
    var endZone = $('#footer').offset().top - $window.height() - 1;

    $window.on('scroll', function(){
        if((endZone) < $window.scrollTop()) {
            $slideAd.animate({'right': '0px'}, 250);
        } else {
            $slideAd.stop(true).animate({'right': '-50%'}, 250);
        }
    });
});
