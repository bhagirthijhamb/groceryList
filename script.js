$(document).ready(function(){
    // SETUP
    let $list, $newItemForm, $newItemButton;
    let item = '';      // item is an empty string
    $list = $('ul');    // cache the unordered list
    $newItemForm = $('#newItemForm')  // cache form to add new Item
    $newItemButton = $('#newItemButton');  // cache button to show form

    $('li').hide().each(function(index) {  // Hide list items
        $(this).delay(450 * index).fadeIn(1600); // Then fade them in
    })

    // ITEM COUNTER
    const updateCount = () => {         // declare function
        const items = $('li[class!=complete]').length;  // Number of items in list
        console.log(items)
        $('#counter').text(items);
    }
    updateCount();

    // SETUP FORM FOR NEW ITEMS
    $newItemButton.show(); // Show the buttom
    $newItemForm.hide(); // Hide the form
    $('#showForm').on('click', () => {  // When new item clicked
        $newItemButton.hide();  // Hide the buttom
        $newItemForm.show();  // Show the form
    });

    //ADDING A NEW LIST ITEM
    $newItemForm.on('submit', function(e) { // when a new item is submitted
        e.preventDefault();  // Prevent form from being submitted
        const text = $('input:text').val();  // Get value of the text input
        $list.append('<li>' + text + '</li>'); //Ad item to end of the list
        $('input:text').val(''); // Empty the text input
        updateCount(); // Update the count
    });

    // CLICK HANDLING - USES DELEGATION ON <UL> ELEMENT
    $list.on('click', 'li', function() {
        const $this = $(this);
        const complete = $this.hasClass('complete');  //Is item complete

        if(complete === true) {         // Check if the item is complete
            $this.animate({             // If so, animate opacity + padding
                opacity: 0.0, 
                paddingLeft: '+=180'
            }, 500, 'swing', function() { // Use callback when animation completes
                $this.remove();         // Then completely remove this item 
            });             
        } else {                        // Otherwise indicate it ia complete
            item = $this.text()          // Get the text from the list item
            $this.remove();             // remove the list item
            $list                       // Add back to end of list as complete
                .append('<li class=\"complete\">' + item + '</li>')
                .hide().fadeIn(300);    // Hide it so it can be faded in
            updateCount();              // Update the counter
        }                               // End of else option
    })                                  // End of event handler
});
