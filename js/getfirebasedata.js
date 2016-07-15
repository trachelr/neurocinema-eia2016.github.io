function happy_dataset(vkey, happy_pts){ 
    var emoRef = new Firebase("https://neurocinema-a859d.firebaseio.com/emotions/" + vkey + "/happy/");
    var hasView = 0;
    var happy_c = 0;
    emoRef.once("value", function(allEmotionData) {
        allEmotionData.forEach(function(emoSnapshot) {
            var tckey = emoSnapshot.key();
            //console.log(tckey)
            var tcpath = vkey + "/happy/" + tckey + "/localisation/0/sublocalisations/localisation/"
            //console.log(tcpath)
            tcRef = new Firebase("https://neurocinema-a859d.firebaseio.com/emotions/" + tcpath);
            tcRef.once("value", function(allTcData) {
                allTcData.forEach( function(tcSnapShot) {
                    var tckey = tcSnapShot.key();
                    var tcin = tcSnapShot.child("tcin").val();
                    //console.log("reading tcin: " + tcin);
                    var tcout = tcSnapShot.child("tcout").val();
                    //console.log("reading tcout: " + tcout);
                    tcinh = parseInt(tcin.split(":")[0]);
                    tcinm = parseInt(tcin.split(":")[1]);
                    tcins = parseInt(tcin.split(":")[2].split(".")[0]);

                    tcouth = parseInt(tcout.split(":")[0]);
                    tcoutm = parseInt(tcout.split(":")[1]);
                    tcouts = parseInt(tcout.split(":")[2].split(".")[0]);
                    for (var i = tcins; i < tcouts; i++) {
                        //points[n][i] = points[n][i] + 1;
                        happy_pts[i] = happy_pts[i] + 1;
                    }
                    if (hasView == 0){
                        if (tcinh + tcinm + tcins > 0) {
                            happy_c = happy_c + 1;
                            hasView = 1;
                        }
                    }
                });
            });
        });
    });
    return happy_pts, happy_c;
}


function surprised_dataset(vkey, surp_pts) { 
    var surp_c = 0;
    var emoRef = new Firebase("https://neurocinema-a859d.firebaseio.com/emotions/" + vkey + "/surprised/");
    console.log("getting surprised data")
    emoRef.once("value", function(allEmotionData) {
        allEmotionData.forEach(function(emoSnapshot) {
            var tckey = emoSnapshot.key();
            //console.log(tckey)
            var tcpath = vkey + "/surprised/" + tckey + "/localisation/0/sublocalisations/localisation/"
            //console.log(tcpath)
            tcRef = new Firebase("https://neurocinema-a859d.firebaseio.com/emotions/" + tcpath);
            var hasView = 0;
            tcRef.once("value", function(allTcData) {
                allTcData.forEach( function(tcSnapShot) {
                    var tckey = tcSnapShot.key();
                    var tcin = tcSnapShot.child("tcin").val();
                    //console.log("reading tcin: " + tcin);
                    var tcout = tcSnapShot.child("tcout").val();
                    //console.log("reading tcout: " + tcout);
                    tcinh = parseInt(tcin.split(":")[0]);
                    tcinm = parseInt(tcin.split(":")[1]);
                    tcins = parseInt(tcin.split(":")[2].split(".")[0]);

                    tcouth = parseInt(tcout.split(":")[0]);
                    tcoutm = parseInt(tcout.split(":")[1]);
                    tcouts = parseInt(tcout.split(":")[2].split(".")[0]);
                    for (var i = tcins; i < tcouts; i++) {
                        //points[n][i] = points[n][i] + 1;
                        surp_pts[i] = surp_pts[i] + 1;
                    }
                    if (hasView == 0){
                        if (tcinh + tcinm + tcins > 0) {
                            surp_c = surp_c + 1;
                            hasView = 1;
                        }
                    }
                });
            });
        });
    });
    return surp_pts, surp_c;
}

function angry_dataset(vkey, angry_pts) { 
    var angry_c = 0;
    var emoRef = new Firebase("https://neurocinema-a859d.firebaseio.com/emotions/" + vkey + "/angry/");
    console.log("getting angry data set");
    emoRef.once("value", function(allEmotionData) {
        allEmotionData.forEach(function(emoSnapshot) {
            var tckey = emoSnapshot.key();
            //console.log(tckey)
            var tcpath = vkey + "/angry/" + tckey + "/localisation/0/sublocalisations/localisation/"
            //console.log(tcpath)
            tcRef = new Firebase("https://neurocinema-a859d.firebaseio.com/emotions/" + tcpath);
            var hasView = 0;
            tcRef.once("value", function(allTcData) {
                allTcData.forEach( function(tcSnapShot) {
                    var tckey = tcSnapShot.key();
                    var tcin = tcSnapShot.child("tcin").val();
                    //console.log("reading tcin: " + tcin);
                    var tcout = tcSnapShot.child("tcout").val();
                    //console.log("reading tcout: " + tcout);
                    tcinh = parseInt(tcin.split(":")[0]);
                    tcinm = parseInt(tcin.split(":")[1]);
                    tcins = parseInt(tcin.split(":")[2].split(".")[0]);

                    tcouth = parseInt(tcout.split(":")[0]);
                    tcoutm = parseInt(tcout.split(":")[1]);
                    tcouts = parseInt(tcout.split(":")[2].split(".")[0]);
                    for (var i = tcins; i < tcouts; i++) {
                        //points[n][i] = points[n][i] + 1;
                        angry_pts[i] = angry_pts[i] + 1;
                    }
                    if (hasView == 0){
                        if (tcinh + tcinm + tcins > 0) {
                            angry_c = angry_c + 1;
                            hasView = 1;
                        }
                    }
                });
            });
        });
    });
    return angry_pts, angry_c;
}


function sad_dataset(vkey, sad_pts) {
    var sad_c = 0;
    var emoRef = new Firebase("https://neurocinema-a859d.firebaseio.com/emotions/" + vkey + "/sad/");
    //console.log("getting sad data set"
    emoRef.once("value", function(allEmotionData) {
        allEmotionData.forEach(function(emoSnapshot) {
            var tckey = emoSnapshot.key();
            //console.log(tckey)
            var tcpath = vkey + "/sad/" + tckey + "/localisation/0/sublocalisations/localisation/"
            //console.log(tcpath)
            tcRef = new Firebase("https://neurocinema-a859d.firebaseio.com/emotions/" + tcpath);
            var hasView = 0;
            tcRef.once("value", function(allTcData) {
                allTcData.forEach( function(tcSnapShot) {
                    var tckey = tcSnapShot.key();
                    var tcin = tcSnapShot.child("tcin").val();
                    //console.log("reading tcin: " + tcin);
                    var tcout = tcSnapShot.child("tcout").val();
                    //console.log("reading tcout: " + tcout);
                    tcinh = parseInt(tcin.split(":")[0]);
                    tcinm = parseInt(tcin.split(":")[1]);
                    tcins = parseInt(tcin.split(":")[2].split(".")[0]);

                    tcouth = parseInt(tcout.split(":")[0]);
                    tcoutm = parseInt(tcout.split(":")[1]);
                    tcouts = parseInt(tcout.split(":")[2].split(".")[0]);
                    for (var i = tcins; i < tcouts; i++) {
                        //points[n][i] = points[n][i] + 1;
                        sad_pts[i] = sad_pts[i] + 1;
                    }
                    if (hasView == 0){
                        if (tcinh + tcinm + tcins > 0) {
                           sad_c = sad_c + 1;
                            hasView = 1;
                        }
                    }
                });
            });
        });
    });
    return sad_pts, sad_c;
}
