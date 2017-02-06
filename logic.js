//Global declration of variables
var table="";
var i=0;
var j=0;
var data1=[];
var $id=$('#id');
var $age=$('#age');
var $name=$('#name');
var $gender=$('#gender');
var $company=$('#company');
var $email=$('#email');
var $tb=$('#tb');
//Function for infinite scrolling
$infinitescroll=function(data){
for(j=i;i<j+50;i++)
{
table += '<tr><td><input class="id1" style="background-color: #FEF7D6;border: 2px solid #4899BE;" value='+data[i].id+'></td><td><input class="name1"style="background-color: #FEF7D6;border: 2px solid #4899BE;" value="'+data[i].name+'"></td>'
+'<td><input class="age1" style="background-color: #FEF7D6;border: 2px solid #4899BE;"value='+data[i].age+'></td><td><input class="email1 responsive" style="background-color: #FEF7D6;border: 2px solid #4899BE;"value="'+data[i].email+'></td>'
+'<td><input class="gender1" style="background-color: #FEF7D6;border: 2px solid #4899BE;"value='+data[i].gender+'></td><td><input class="company1 responsive" style="background-color: #FEF7D6;"value='+data[i].company+'></td>'
+'</td><td><button class="editProfile" style="width:100px;border: 2px solid #4899BE;padding-left:0px;background-color:green;"data-id='+data[i].id+'>Update</button></td>'
+'</td><td><button class="remove" style="border: 2px solid #4899BE;width:100px;padding-right:0px;background-color:red;"data-id='+data[i].id+'>Delete</button></td></tr>' ;	
}
$("#tb").append(table);

table="";
};

//This function will be called once the document is fully loaded

$(document).ready(function()
{
$.ajax(
{
type:'GET',
url:'http://localhost:3000/profile',
success:function(data)
{
	data1=data;
$infinitescroll(data1);

}
});
});
//Mustache js template for post and put operation
var profileTemplate= $('#profile-template').html();
function addProfile(pro)
{
$tb.append(Mustache.render(profileTemplate,pro));
}
//Post operation
 $('#add-profile').on('click',function()
{

var profile={
age: $age.val(),
name: $name.val(),
gender: $gender.val(),
company: $company.val(),
email: $email.val(),

  };

$.ajax(
{
type:'POST',
url:'http://localhost:3000/profile',
data:profile,
success:function(newProfile)
{
	addProfile(newProfile);

}
});
});
//Delete operation
$(document).on('click','.remove',function()
{
	var $tab=$(this).closest('tr');
$.ajax({
type:'DELETE',
url:'http://localhost:3000/profile/' + $(this).attr('data-id'),
success:function()
{
$tab.remove();
}
});
});
//Update operation
$(document).on('click','.editProfile',function()
{
	
var tab1=$(this).closest('tr');
var obj={
age:tab1.find('input.age1').val(),
name:tab1.find('input.name1').val(),
id:tab1.find('input.id1').val(),
email:tab1.find('input.email1').val(),
gender: tab1.find('input.gender1').val(),
company:tab1.find('input.company1').val(),
};
$.ajax(
{
type:'PUT',
url:'http://localhost:3000/profile/' + $(this).attr('data-id'),
data:obj,
success:function(obj)
{
 addProfile(obj);
}
});
});
$(window).scroll(function() {
    if ($(document).height() - $(window).height() == $(window).scrollTop()) {

      $infinitescroll(data1);
    }

  });


