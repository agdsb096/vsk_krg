// HTTP
function requestPost(requestData) {
    var xhr = new XMLHttpRequest();
    var url = "127.0.0.1:3030";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var responseData = JSON.parse(xhr.responseText);
            console.log(responseData);
            return responseData;
        }
    }
    xhr.send(JSON.stringify(requestData));
};

// DATE
function getDate() {
    var d = new Date(Date.now()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    
    var result = [day, month, year].join('-');
    result += ' ' + d.toString().split(' ')[4];
    return result;
};
console.log(getDate());

// FUNC
function o(data) {
    console.log(data);
};

// SCRIPT
requestPost({
    method: 'start',
});