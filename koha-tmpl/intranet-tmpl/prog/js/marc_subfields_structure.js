$(document).ready(function() {
    $( ".constraints" ).accordion();
    $('#subfieldtabs').tabs();
    $("input[id^='hidden_']").click(setHiddenValue);
    $("input[id^='hidden-']").each(function() {
        populateHiddenCheckboxes($(this).attr('id').split('-')[1]);
    });

});

/* Function to enable/disable hidden values checkboxes when Flag is (de)selected */
function enable_cb(tab) {
    if ($("#hidden_flagged_" + tab).is(':checked')) {
        $('.inclusive_' + tab).prop('disabled', true).prop('checked', false);
    }
    else {
        $('.inclusive_' + tab).prop('disabled', false);
    }
}

/* Function to serialize and set the 'hidden' field */
function setHiddenValue() {

    var tab = $(this).attr('id').split('_')[2];
    var flagged_checked = $("#hidden_flagged_" + tab).is(':checked');
    var opac_checked = $("#hidden_opac_" + tab).is(':checked');
    var intranet_checked = $("#hidden_intranet_" + tab).is(':checked');
    var editor_checked = $("#hidden_editor_" + tab).is(':checked');
    var collapsed_checked = $("#hidden_collapsed_" + tab).is(':checked');
    var hidden_value = "";

    if ( flagged_checked ) {
        hidden_value='-8';
    } else if ( opac_checked && ! intranet_checked && ! editor_checked && collapsed_checked ) {
        hidden_value='-7';
    } else if ( opac_checked && intranet_checked && ! editor_checked && ! collapsed_checked) {
        hidden_value='-6';
    } else if ( opac_checked && intranet_checked && ! editor_checked && collapsed_checked) {
        hidden_value='-5';
    } else if ( opac_checked && ! intranet_checked && ! editor_checked && ! collapsed_checked) {
        hidden_value='-4';
    } else if ( opac_checked && ! intranet_checked && editor_checked && collapsed_checked) {
        hidden_value='-3';
    } else if ( opac_checked && ! intranet_checked && editor_checked && ! collapsed_checked) {
        hidden_value='-2';
    } else if ( opac_checked && intranet_checked && editor_checked && collapsed_checked) {
        hidden_value='-1';
    } else if ( opac_checked && intranet_checked && editor_checked && ! collapsed_checked) {
        hidden_value='0';
    } else if ( ! opac_checked && intranet_checked && editor_checked && collapsed_checked) {
        hidden_value='1';
    } else if ( ! opac_checked && ! intranet_checked && editor_checked && ! collapsed_checked) {
        hidden_value='2';
    } else if ( ! opac_checked && ! intranet_checked && editor_checked && collapsed_checked) {
        hidden_value='3';
    } else if ( ! opac_checked && intranet_checked && editor_checked && ! collapsed_checked) {
        hidden_value='4';
    } else if ( ! opac_checked && ! intranet_checked && ! editor_checked && collapsed_checked) {
        hidden_value='5';
    } else if ( ! opac_checked && intranet_checked && ! editor_checked && ! collapsed_checked) {
        hidden_value='6';
    } else if ( ! opac_checked && intranet_checked && ! editor_checked && collapsed_checked) {
        hidden_value='7';
    } else if ( ! opac_checked && ! intranet_checked && ! editor_checked && ! collapsed_checked) {
        hidden_value='8';
    }

    enable_cb(tab);

    $('#hidden-' + tab).val(hidden_value);

}

function populateHiddenCheckboxes(tab) {
    // read the serialized value
    var hidden_value = $('#hidden-' + tab).val();
    // deafult to false
    var opac_checked = false;
    var intranet_checked = false;
    var editor_checked = false;
    var collapsed_checked = false;
    var flagged_checked = false;

    if ( hidden_value == '-8' ) {
        flagged_checked = true;
    } else if ( hidden_value == '-7') {
        opac_checked = true;
        collapsed_checked = true;
    } else if ( hidden_value == '-6' ) {
        opac_checked = true;
        intranet_checked = true;
    } else if ( hidden_value == '-5') {
        opac_checked = true;
        intranet_checked = true;
        collapsed_checked = true;
    } else if ( hidden_value == '-4' ) {
        opac_checked = true;
    } else if ( hidden_value == '-3') {
        opac_checked = true;
        editor_checked = true;
        collapsed_checked = true;
    } else if ( hidden_value == '-2' ) {
        opac_checked = true;
        editor_checked = true;
    } else if ( hidden_value == '-1' ) {
        opac_checked = true;
        intranet_checked = true;
        editor_checked = true;
        collapsed_checked = true;
    } else if ( hidden_value == '0' ) {
        opac_checked = true;
        intranet_checked = true;
        editor_checked = true;
    } else if ( hidden_value == '1' ) {
        intranet_checked = true;
        editor_checked = true;
        collapsed_checked = true;
    } else if ( hidden_value == '2' ) {
        editor_checked = true;
    } else if ( hidden_value == '3' ) {
        editor_checked = true;
        collapsed_checked = true;
    } else if ( hidden_value == '4' ) {
        intranet_checked = true;
        editor_checked = true;
    } else if ( hidden_value == '5' ) {
        collapsed_checked = true;
    } else if ( hidden_value == '6' ) {
        intranet_checked = true;
    } else if ( hidden_value == '7' ) {
        intranet_checked = true;
        collapsed_checked = true;
    } // else if ( hidden_value == '8') { skip }

    $("#hidden_opac_" + tab).prop('checked',opac_checked);
    $("#hidden_intranet_" + tab).prop('checked',intranet_checked);
    $("#hidden_editor_" + tab).prop('checked',editor_checked);
    $("#hidden_collapsed_" + tab).prop('checked',collapsed_checked);
    $("#hidden_flagged_" + tab).prop('checked',flagged_checked);

    enable_cb(tab);

}
