var robot={
  SearchLimit:3,
  idGroups:[
    "",
  ],
  AllTokens:[
       
        {name:"NAMA FACEBOOKMU",token:"PASTE KODE TOKENMU DISINI"}

  ]
};

//Using Trigger in Function "modeon()" with Timer per-Minute//

function PullBoss(almt,prop){
  var a=UrlFetchApp.fetch(almt,{
    muteHttpExceptions:true,
    method:"post",
    payload:prop
  });
  var b=Utilities.jsonParse(a.getContentText());
  return b;
}
function stir(what){
  var a=what.sort(function(){return 0.5-Math.random()});
  a.reverse();
  a=a.sort(function(){return 0.5-Math.random()});
  return a;
}
function modeon(){
  var a=stir(robot.AllTokens);
  if(a[0].token==""){
    robot.tokenNow=a[0].apptkn;
  }else{
    robot.tokenNow=a[0].token;
  }
  var p=PullBoss("https://graph.facebook.com/me",{
    method:"get",
    fields:"id",
    access_token:robot.tokenNow
  });
  if(p&&p.id){
    robot.uidNow=p.id;
    var b=stir(robot.idGroups);
    robot.idGroupSekarang=b[0];
    var q=PullBoss("https://graph.facebook.com/me/home",{
      method:"get",
      fields:"id,likes,comments.fields(id,user_likes)",
      limit:robot.SearchLimit,
      access_token:robot.tokenNow
    });
    if(q&&q.data&&q.data.length!=0){
      for(x in q.data){
        var c="y";
        var d=q.data[x];
        if(d.likes&&d.likes.data&&d.likes.data.length!=0){
          for(y in d.likes.data){
            if(d.likes.data[y].id&&d.likes.data[y].id==robot.uidNow){
              c="n";
              break;
            }
          }
        }
        if(c=="n"&&d.comments&&d.comments.data&&d.comments.data.length!=0){
          for(z in d.comments.data){
            if(!d.comments.data[z].user_likes){
              var r=PullBoss("https://graph.facebook.com/"+d.comments.data[z].id+"/likes",{
                method:"post",
                access_token:robot.tokenNow
              });
              break;
            }
          }
        }
        if(c=="y"){
          var r=PullBoss("https://graph.facebook.com/"+d.id+"/likes",{
            method:"post",
            access_token:robot.tokenNow
          });
        }
      }
    }
  }
}
