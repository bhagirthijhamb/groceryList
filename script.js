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
})
