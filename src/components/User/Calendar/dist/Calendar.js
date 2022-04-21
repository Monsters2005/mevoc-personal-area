"use strict";
exports.__esModule = true;
exports.Calendar = void 0;
var react_1 = require("react");
var moment_1 = require("moment");
var react_dates_1 = require("react-dates");
var Calendar_module_scss_1 = require("./Calendar.module.scss");
require("react-dates/initialize");
require("react-dates/lib/css/_datepicker.css");
function Calendar(_a) {
    var startDate = _a.startDate, endDate = _a.endDate, setGraphDates = _a.setGraphDates, setActiveTab = _a.setActiveTab;
    var _b = react_1.useState(null), focusedInput = _b[0], setFocusedInput = _b[1];
    var _c = react_1.useState({
        startDate: null,
        endDate: null
    }), dates = _c[0], setDates = _c[1];
    react_1.useEffect(function () {
        setDates({ startDate: moment_1["default"](startDate), endDate: moment_1["default"](endDate) });
        setGraphDates({ startDate: startDate, endDate: endDate });
    }, [startDate, endDate]);
    return (react_1["default"].createElement("div", { className: Calendar_module_scss_1["default"].calendar_container },
        react_1["default"].createElement(react_dates_1.DateRangePicker, { hideKeyboardShortcutsPanel: true, inputIconPosition: "after", numberOfMonths: 1, keepOpenOnDateSelect: true, displayFormat: "DD.MM.YY", isOutsideRange: function () { return false; }, customArrowIcon: ' ', startDate: dates.startDate, startDateId: "1", endDate: dates.endDate, endDateId: "2", 
            // eslint-disable-next-line
            onDatesChange: function (_a) {
                var startDate = _a.startDate, endDate = _a.endDate;
                setDates(function () { return ({
                    startDate: startDate,
                    endDate: endDate
                }); });
                setGraphDates({
                    startDate: new Date((startDate === null || startDate === void 0 ? void 0 : startDate.toString()) || ''),
                    endDate: new Date((endDate === null || endDate === void 0 ? void 0 : endDate.toString()) || '')
                });
                if (setActiveTab) {
                    setActiveTab('off');
                }
            }, focusedInput: focusedInput, 
            // eslint-disable-next-line
            onFocusChange: function (focusedInput) {
                setFocusedInput(focusedInput);
            } })));
}
exports.Calendar = Calendar;
