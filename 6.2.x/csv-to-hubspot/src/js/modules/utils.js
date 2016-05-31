var UTILS = (function() {
    // Converts an HTML table to JS object
    var tableToJson = function(table) {
        var data = [];

        var headers = [];
        for (var i = 0; i < table.rows[0].cells.length; i++) {
            headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
        }

        for (var i = 1; i < table.rows.length; i++) {
            var tableRow = table.rows[i];
            var rowData = {};

            for (var j = 0; j < tableRow.cells.length; j++) {
                rowData[headers[j]] = tableRow.cells[j].innerHTML;
            }

            data.push(rowData);
        }

        return data;
    }

    // adds object key renaming method to Objects object
    Object.prototype.renameProperty = function(oldName, newName) {
        // Do nothing if the names are the same
        if (oldName == newName) {
            return this;
        }
        // Check for the old property name to avoid a ReferenceError in strict mode.
        if (this.hasOwnProperty(oldName)) {
            this[newName] = this[oldName];
            delete this[oldName];
        }
        return this;
    };

    return {
        tableToJson: tableToJson
    }
})();
