
$(document).ready(function() {
    ;(function($) {
        var $self = null;

        $.fn['itemTable'] = function(options, fire) {
            options = options || {};

            $self = $(this);
            initButtons();
            setRowNumber();
            initDeleteRow();
            initInsertRow();
        }

        // Add Insert / Delete button
        function initButtons() {
            // Add Delete button for each lines
            $('<th />').insertAfter($self.find('thead > tr > th:last'));
            var buttonTd = $('<td class=""><a class="btn btn-xs btn-round btn-danger js-delete-row"><i class="fa fa-times"></i></a></td>');
            $self.find('tbody > tr').each(function() {
                buttonTd.clone().insertAfter($(this).find('td:last'));
            });

            // Add Insert button to last line
            var colNum = $self.find('tr:last > td').length;
            var buttonTr = $('<tr><td class="" colspan="' + colNum + '"><a class="btn btn-default btn-round btn-xs btn-success" id="add-row"><i class="fa fa-plus"></i> Add</a></td></tr>');
            buttonTr.insertAfter($self.find('tr:last'));
        }

        // Auto set row number in table
        function setRowNumber() {
            $self.find('td.js-row-no').each(function (i) {
                i = i + 1;
                $(this).text(i);
            });
        };

        // delete row
        function initDeleteRow() {
            $self.on('click', '.js-delete-row', function() {
                if (countRow() > 1) {
                    $(this).closest("tr").remove();
                    setRowNumber();
                } else {
                    resetFields($(this).closest("tr"));
                }
            });
        }

        // insert row
        function initInsertRow() {
            $self.on('click', '#add-row', function() {
                var insertRow = $(this).closest("tbody").find('tr:first').clone();
                resetFields(insertRow);
                insertRow.insertBefore($(this).closest('tr'));
                setRowNumber();
            });
        }

        function countRow() {
            return $self.find('tbody > tr').length - 1;
        }

        function resetFields($c) {
            $c.find('input, select, textarea').each(function() {
                $(this).val('');
            });
        }

    })(window.jQuery);
});