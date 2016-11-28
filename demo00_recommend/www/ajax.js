function setUserVector(){
    document.getElementById("data-set").innerHTML=xmlhttp.responseText;
}
function loadXMLDoc(url, func){
    xmlhttp=new XMLHttpRequest();
    function state_Change(){
	if (xmlhttp.readyState==4){
	    if (xmlhttp.status==200) {// 200 = "OK"
		func()
	    } else {
		alert("Problem retrieving data:" + xmlhttp.statusText);
	    }
	}
    }
    xmlhttp.onreadystatechange=state_Change;
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);
}

function mame (){
    var url = "http://localhost:8888/data-set";
    loadXMLDoc(url, setUserVector);
}
