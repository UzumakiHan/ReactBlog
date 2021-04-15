var express = require('express');
var router = express.Router();
const connection = require('.././db/db')

const md5 = require('md5')
const multiparty = require('multiparty');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//查询数据
router.post("/findid", (req, res) => {
  let id = req.body.id;
  const sqlStr = "SELECT * FROM blog WHERE id = '" + id + "' ";
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      // results = JSON.parse(JSON.stringify(results));
      console.log(results);
      //  for(var i = 0;i < results.length;i++){
      //    console.log(results[i])
      //  }
      res.json({ success_code: 200, message: results });

    }
  });
})


//注册
router.post('/reqregister', (req, res) => {
  let username = req.body.username;
  let password = md5(req.body.password);
  let status = req.body.status;
  // console.log(username,password);
  const sqlStr = "SELECT * FROM user WHERE username = '" + username + "'";
  connection.query(sqlStr, (error, results, fields) => {
    if (results[0]) {//用户已经存在
      res.json({ err_code: 0, message: "用户名已经存在" })
    } else {
      const addSql = "INSERT INTO user (username, password,status) VALUES (?, ?,?)";
      const addSqlParams = [username, password, status];
      connection.query(addSql, addSqlParams, (error, results, fields) => {
        if (error) {
          res.json({ err_code: 0, message: "注册失败" })
        } else {
          res.json({ success_code: 200, message: "注册成功", userinfo: results[0] })
        }
      })
    }
  })
})
//登录
router.get('/reqlogin', (req, res) => {
  let username = req.query.username;
  let password = md5(req.query.password);
  console.log(username, password)
  const sqlStr = "SELECT * FROM user WHERE username = '" + username + "'";
  connection.query(sqlStr, (error, results, fields) => {
    results = JSON.parse(JSON.stringify(results));
    console.log(results);
    results = JSON.parse(JSON.stringify(results));
    if (results[0]) {
      if (results[0].password !== password) {
        res.json({ err_code: 0, message: '密码不正确!' });
      } else {
        res.json({ success_code: 200, data: results, tip: "登录成功" })
      }
    } else {
      res.json({ err_code: 404, message: '用户名不正确!' });
    }

  })
})


//文章发布
router.post('/release', (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  let label = req.body.label;
  let mold = req.body.mold;
  let currentime = req.body.currentime;
  let author = req.body.author;
  let image = req.body.image;
  console.log(title, content, label, mold, currentime, author, image);
  const sqlStr = "INSERT INTO blog(content,title,mold,label,currentime,author,image) VALUES (?,?,?,?,?,?,?)";
  const addSqlParams = [content, title, mold, label, currentime, author, image];
  connection.query(sqlStr, addSqlParams, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: "发布文章失败" });
    } else {
      console.log(results);
      res.json({ success_code: 200, message: "发布文章成功" });
    }
  })

})


//获取所有文章信息

router.get('/getallcontent', (req, res) => {
  const { pageNum, pageSize } = req.query
  const array = [];
  const sqlStr = 'SELECT * FROM blog ';
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {

      results = JSON.parse(JSON.stringify(results));
      // console.log(results);
      for (var i = 0; i < results.length; i++) {
        array.push(new Buffer(results[i].content.data).toString());
      }
      //console.log(array);
      res.json({ success_code: 200, data: pageFilter(results, pageNum, pageSize) });

    }
  })
})
//获取热门文章
router.get('/getHotArticle', (req, res) => {
  const { limitcount } = req.query
  console.log(limitcount)
  const sqlStr = `SELECT * FROM blog order by readcount desc limit ${limitcount}`;
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {

      results = JSON.parse(JSON.stringify(results));
      // results = results.sort((a, b) => a.readconut- b.readconut)
      res.json({ success_code: 200, data: results });

    }
  })
})

//获取个人文章信息
router.get('/getowncontent', (req, res) => {
  let { author, pageNum, pageSize } = req.query;
  console.log(author);

  const sqlStr = "SELECT * FROM blog WHERE author = '" + author + "' ";
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {

      results = JSON.parse(JSON.stringify(results));
      // console.log(result
      // console.log(array);
      res.json({ success_code: 200, data: pageFilter(results, pageNum, pageSize) });

    }
  })
})

//修改个人资料
router.post('/modifyingdata', (req, res) => {
  const { username, birthday, location, information, realname, job, sex } = req.body;
  console.log(username, birthday, location, information, realname, job, sex);

  const sqlStr = "UPDATE user SET birthday = '" + birthday + "', location = '" + location + "',information = '" + information + "', realname = '" + realname + "',job = '" + job + "',sex = '" + sex + "' WHERE username = '" + username + "' ";
  const otherSqlStr = "SELECT * FROM user WHERE username = '" + username + "'";
  connection.query(sqlStr, (error, results, fields) => {
    results = JSON.parse(JSON.stringify(results));
    if (error) {
      res.json({ success_code: 0, message: "修改资料失败" });
    } else {
      connection.query(otherSqlStr, (err, result, field) => {
        if (err) {
          res.json({ success_code: 0, message: "修改资料失败" });
        } else {
          console.log(result);
          res.json({ success_code: 200, tip: "修改成功", data: result });
        }
      })

    }
  })
})

//获取个人信息；
router.post('/getinfo', (req, res) => {
  const username = req.body.username;
  console.log(username);
  const sqlStr = "SELECT * FROM user WHERE username = '" + username + "' ";
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: "获取数据失败" })
    } else {
      res.json({ success_code: 200, message: results })
      //console.log(results);
    }
  })
})
//图片上传

router.post('/submitImage', (req, res) => {
  const { image, username } = req.body;
  console.log(image, username);
  const sqlStr = "UPDATE user SET image = '" + image + "' WHERE username = '" + username + "' ";

  
  const userSqlStr = "SELECT * FROM user WHERE username = '" + username + "' ";
  // const userSqlStr = "SELECT * FROM user WHERE username = '" + username + "' ";
 // const otherSqlStr = "UPDATE blog SET image = '" + image + "'  WHERE author = '" + username + "'";
  connection.query(sqlStr, (err, result, fields) => {
    if (err) {
      res.json({ status: 400, message: '修改头像失败' })
    } else {
      connection.query(userSqlStr, (error, results, field) => {
        if (!error) {
          res.json({ status: 200, data: results })

        }
      })
    }
  })
})

router.post('/blogUserImage', (req, res) => {
  const { image, username } = req.body;
  console.log(image, username);
  const sqlStr = "UPDATE blog SET image = '" + image + "' WHERE author = '" + username + "' ";
  connection.query(sqlStr, (err, result, fields) => {
    if (!err) {
      res.json({ status: 200})
    }else{
      res.json({ status: 400})
    }
  })
})

//获取图片
router.post('/getimage', (req, res) => {
  const username = req.body.username;
  console.log(username);
  const sqlStr = "SELECT * FROM user WHERE username = '" + username + "'";
  connection.query(sqlStr, (error, results, files) => {
    if (error) {
      console.log(error);
      res.json({ success_code: 0, message: '获取失败' })
    } else {
      results = JSON.parse(JSON.stringify(results[0]));
      // console.log(results);
      res.json({ success_code: 200, message: results })
    }
  })
})


//删除文章
router.post('/delarticle', (req, res) => {
  const id = req.body.id;
  console.log(id);
  const sqlStr = "DELETE FROM blog WHERE id = '" + id + "'";
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: "删除失败" });
    } else {
      res.json({ success_code: 200, message: "删除文章成功" })
    }
  })
})
//编辑文章
router.post('/editarticle', (req, res) => {
  const { id, title, content, label, mold, currentime } = req.body;
  console.log(id, title, content, label, mold, currentime);
  const sqlStr = "UPDATE blog SET title =  '" + title + "',content =  '" + content + "',label =  '" + label + "',mold =  '" + mold + "',currentime =  '" + currentime + "' WHERE id = '" + id + "' ";
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      console.log(error)
      res.json({ err_code: 0, message: "修改失败" });
    } else {
      console.log(results)
      res.json({ success_code: 200, message: "修改成功" })
    }
  })
})


//修改密码接口
router.post('/changepassword', (req, res) => {
  const id = req.body.id;
  const changepassword = md5(req.body.changepassword);
  console.log(id, changepassword);
  const sqlStr = "UPDATE user SET password = '" + changepassword + "' WHERE id = '" + id + "' ";
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ success_code: 0, message: "修改密码失败" });
    } else {
      console.log(results);
      res.json({ success_code: 200, message: "修改密码成功" });
    }
  })
})

//阅读数
router.get('/readconut', (req, res) => {
  const { readconut, id } = req.query
  // let readconut = req.body.count;
  // let id = req.body.id;
  const sqlStr = `UPDATE blog SET readcount = ${readconut} WHERE id = ${id}`;
  connection.query(sqlStr, (error, results, files) => {
    if (error) {
      res.json({ err_code: 0 });
    } else {
      res.json({ success_code: 200 });
    }
  })
})

//评论
router.post('/commit', (req, res) => {
  const { blogimg, bloguser, blogid, tousername, status, blogcomment, commentime } = req.body;
  console.log(blogimg, bloguser, blogid, tousername, status, blogcomment, commentime);
  const sqlStr = "INSERT INTO comment(blogimg,bloguser,blogid,tousername,status,blogcomment,commentime) VALUES (?,?,?,?,?,?,?)";
  const addSqlParams = [blogimg, bloguser, blogid, tousername, status, blogcomment, commentime];
  connection.query(sqlStr, addSqlParams, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: "发表评论失败" })
    } else {
      res.json({ success_code: 200, message: results })
    }
  })
});

//获取相对于的评论
router.get('/getcommit', (req, res) => {
  let blogid = req.query.blogid;
  console.log(blogid)
  const sqlStr = `SELECT * FROM comment WHERE blogid = ${blogid}`;
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: "获取失败" });
    } else {
      res.json({ success_code: 200, message: results });

    }
  })
})


router.post('/getmycomment', (req, res) => {
  let tousername = req.body.tousername;
  console.log(tousername)
  const sqlStr = "SELECT * FROM comment WHERE tousername = '" + tousername + "' ";
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: "获取失败" });
    } else {
      res.json({ success_code: 200, message: results });

    }
  })
});
//修改评论状态
router.post('/modifyStatus', (req, res) => {
  let id = req.body.id;
  let status = req.body.status;
  console.log(id, status);
  const sqlStr = "UPDATE comment SET status = '" + status + "' WHERE id = '" + id + "' ";
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: "获取失败" });
    } else {
      res.json({ success_code: 200, message: results });

    }
  })
})

//获取用户卡片
router.post('/getUserCard', (req, res) => {
  let bloguser = req.body.bloguser;
  console.log(bloguser);
  const sqlStr = "SELECT * FROM user WHERE username = '" + bloguser + "' ";
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: "获取失败" });
    } else {
      res.json({ success_code: 200, message: results });

    }
  })

})
//用户关注
router.post('/careUser', (req, res) => {
  let bloguser = req.body.bloguser;
  let carebloguser = req.body.carebloguser;
  let carebloguserimg = req.body.carebloguserimg;
  let carebloguserstate = req.body.carebloguserstate;
  let careblogusersex = req.body.careblogusersex;
  let carestatus = req.body.carestatus;
  console.log(bloguser, carebloguser, carebloguserimg, carebloguserstate, careblogusersex, carestatus);
  const sqlStr = "INSERT INTO careList(bloguser,carebloguser,carebloguserimg,carebloguserstate,careblogusersex,carestatus) VALUES (?,?,?,?,?,?)";
  const addSqlParams = [bloguser, carebloguser, carebloguserimg, carebloguserstate, careblogusersex, carestatus];
  connection.query(sqlStr, addSqlParams, (error, results, fields) => {

    if (error) {
      res.json({ err_code: 0, message: "关注失败" })
    } else {
      res.json({ success_code: 200, message: "关注成功", userinfo: results[0] })
    }
  })

})
//获取用户关注列表
router.post('/getUserList', (req, res) => {
  let bloguser = req.body.bloguser;
  console.log(bloguser);
  const sqlStr = "SELECT * FROM careList WHERE bloguser = '" + bloguser + "' ";
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: "获取失败" });
    } else {
      res.json({ success_code: 200, message: results });

    }
  })

})
//取消关注的用户
router.post('/cancleCare', (req, res) => {
  let carebloguser = req.body.carebloguser;
  console.log(carebloguser);
  const sqlStr = "DELETE FROM careList WHERE carebloguser = '" + carebloguser + "'";
  connection.query(sqlStr, (error, results, files) => {
    if (error) {
      res.json({ err_code: 0, message: "获取失败" });
    } else {
      res.json({ success_code: 200, message: results });

    }
  })
})
//更新状态
router.post('/modifyuserstatus', (req, res) => {
  let id = req.body.id;
  let status = req.body.status;
  console.log(id, status);
  const sqlStr = "UPDATE user SET status = '" + status + "' WHERE id = '" + id + "' ";
  connection.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: "获取失败" });
    } else {
      res.json({ success_code: 200, message: results });

    }
  })
})

//头像更改
// router.post('/updateAvatar',(req,res)=>{
//   console.log(req)
// })
/*
得到指定数组的分页信息对象
 */
function pageFilter(arr, pageNum, pageSize) {
  pageNum = pageNum * 1
  pageSize = pageSize * 1
  const total = arr.length
  const pages = Math.floor((total + pageSize - 1) / pageSize)
  const start = pageSize * (pageNum - 1)
  const end = start + pageSize <= total ? start + pageSize : total
  const list = []
  for (var i = start; i < end; i++) {
    list.push(arr[i])
  }

  return {
    pageNum,
    total,
    pages,
    pageSize,
    list
  }
}
require('./file-upload')(router)
module.exports = router;

