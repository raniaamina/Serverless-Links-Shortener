var data = location.hash.substr(1).substring(1)
// console.log(data);


// Read Config
fetch("assets/js/config.json", {
        "method": "GET",
        "headers": {},
        "Vary": "Origin",
        "Access-Control-Allow-Origin": '*'
    })
    .then(response => response.json())
    .then(response => {
        // document.querySelector('body').setAttribute('ssid', response.SSID)
        // sessionStorage.setItem("ssid", response.SSID);
        var ssid = response.SSID
        // var ssid = sessionStorage.getItem("ssid")
        var url = 'https://docs.google.com/spreadsheets/d/';
        var q1 = '/gviz/tq?';
        var q2 = `tq=SELECT * WHERE C='${data}'`
        var sheetURL = "URL"
        var DataURL = `${url}${ssid}${q1}${q2}&sheet=${sheetURL}`
        // console.log(DataURL)

        if (data === "") {
            console.log("Welcome to Serverless Link Shortner")
        } else {
            document.querySelector("#directing").classList.toggle('d-none')
            document.querySelector("#static").classList.toggle('d-none')
            fetch(DataURL, {
                    "method": "GET",
                    "headers": {},
                    "Access-Control-Allow-Origin": '*'
                })
                .then(resProduct => resProduct.text())
                .then(data => {
                    var from = data.indexOf("{");
                    var to = data.lastIndexOf("}") + 1;
                    var jsonText = data.slice(from, to)
                    var parsedText = JSON.parse(jsonText)
                    var dataUrl = parsedText.table.rows
                    // console.log(dataUrl[0].c)

                    var namaURL = dataUrl[0].c[0].v
                    var deskripsiURL = dataUrl[0].c[1].v
                    var IdURL = dataUrl[0].c[2].v
                    var targetURL = dataUrl[0].c[3].v


                    document.querySelector('#data-name').innerHTML = '<strong>' + namaURL + '</strong>'
                    document.querySelector('#data-url').innerHTML = '(' + targetURL + ')'

                    setTimeout(2000)
                    window.location.replace(targetURL);

                })

                .catch(error => {
                    // 404 Handler
                    console.log('Galat! URL Tidak ditemukan')
                    document.querySelector('#data-judul').innerHTML = 'Galat 404!'
                    document.querySelector('#data-name').innerHTML = '<strong>Halaman tidak ditemukan!</strong>'

                })
        }
    })
    .catch(err => {
        console.error(err);
    })