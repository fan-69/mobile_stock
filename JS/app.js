
var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
var xhr = new XHR();

xhr.onerror = function() {
    alert( 'Ошибка ' + this.status );
};


xhr.onload=function(){
    var dat=JSON.parse(this.responseText);
    document.querySelector('#rec_data').innerHTML=this.responseText;
};

function Post(Serv,data){
    xhr.open('POST',Serv,true);
    xhr.send(JSON.stringify(data));
}
