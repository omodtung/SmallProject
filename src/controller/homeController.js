
// import connection from '../configs/connectDB';
//import { json } from 'body-parser';
import { json } from 'body-parser';
import pool from '../configs/connectDB';


// let getHomepage = (req, res) => {

// let data = []
// connection.query(


//     'SELECT*FROM`users` ',
//     function (err, results, fields) {
//         results.map((row) => {
//             data.push(
//                 {
//                     id: row.id,
//                     fullname: row.fullname,
//                     age: row.age,
//                     gender: row.gender
//                 }
//             )
//         }
//         )

//         return res.render('index.ejs', { dataUser: data })
//     }
// )


// }
//Hàm getHomepage là hàm async lấy tất cả người dùng từ cơ sở dữ liệu và hiển thị
//  chúng trên trang index.ejs. Hàm này đầu tiên sử dụng phương thức pool.execute() 
// để thực thi truy vấn SELECT * FROM users. Điều này trả về một lời hứa giải quyết thành một mảng các hàng, trong đó mỗi
//  hàng là một đối tượng người dùng. Hàm sau đó sử dụng phương thức res.render() 
// để hiển thị trang index.ejs, chuyển mảng rows làm thuộc tính dataUser.
let getHomepage = async (req, res) => {
    const [row, fields] = await pool.execute('SELECT * FROM users');
   return res.render('index.ejs', { dataUser: row })




 // console.log(">>>check row",row)
}


// Được thôi. req.params.id là một thuộc tính đặc biệt trong Express.js chứa giá trị của tham số id từ yêu cầu. Tham số id được sử dụng để xác định người dùng mà bạn muốn truy xuất từ cơ sở dữ liệu.

// Trong mã bạn cung cấp, thuộc tính req.params.id được sử dụng để lấy ID của người dùng



//từ yêu cầu. Sau đó, ID được sử dụng làm tham số cho truy vấn SELECT * FROM users WHERE id = ?. Truy vấn này trả về một hàng từ cơ sở dữ liệu, trong đó hàng chứa thông tin về người dùng có ID đã cho.

// Thông tin về người dùng sau đó được chuyển đổi thành một đối tượng JSON và được gửi lại cho máy khách.
let getDetailPage = async (req, res) => {
     let userId = req.params.id;
     let [user] = await pool.execute("select * from users where id = ?", [userId])
    //console.log("check parameter",req.params)
    console.log(" testing",user)
return res.send(JSON.stringify(user))



}
let createNewUser =  async(req,res)=>
{ console.log("check req ",req.body)
    // return res.send('hello the tung')

    
    let fullname = req.body.firstName
    let Age = req.body.Age
    let Gender = req.body.Gender
  //  console.log('insert into users(fullname,age,gender) values(?,?,?)',[fullname,Age,Gender])
    await pool.execute( 'insert into users(fullname,age,gender) values(?,?,?)',[fullname,Age,Gender])

    // return res.send('hello the tung')
    return res.redirect('/')
}
let DeleteUser  = async (req,res)=>
{
    let userID = req.body.userID
    await pool.execute('delete from users where id = ?',[userID])
    return res.redirect('/')

//  return res.send(`userID deleteUser :${req.body.userID}`)
  
}
let getEditPage = async (req,res)=>
{ 
  let id=req.params.id
  // khi muon tra ra gia tri để có thể hiển hị lại trên trang view khác thì phải dặt biến để có thể chứa 
  // chứa dduwwocj giá trị ví dụ [user] ở đây chứa nguyên row data ở trên database
  // rồi lại được sửa dụng để in ra trên frontend của view ,nhưng khi gán datauser thì phải có số user[0]
  let [user] =await pool.execute('select * from users where id = ?',[id])
  return res.render('update.ejs', { dataUser: user[0] });
}

let postUpdateUser= async (req ,res)=>
{
  // console.log('check request',)
  // return res.render('hello update')

  let {fullname,age,gender,id}= req.body
  await pool.execute('update users set fullname= ?, age = ? , gender = ? where id = ?',
  [fullname, age, gender, id]);

  return res.redirect('/');

}


module.exports = {

    getHomepage,getDetailPage,createNewUser,DeleteUser,getEditPage,postUpdateUser
}
//  viet them 
// let getHomepage = (req, res) => {
//     //logic
//     let data = [];
//     connection.query(
//         'SELECT * FROM `users` ',
//         function (err, results, fields) {
//             results.map((row) => {
//                 data.push({
//                     id: row.id,
//                     email: row.email,
//                     address: row.address,
//                     firstName: row.firstName,
//                     lastName: row.lastName
//                 })

//             });

//             return res.render('test/index.ejs', { dataUser: JSON.stringify(data) })

//         })


// }
