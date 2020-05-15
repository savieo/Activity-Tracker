import React from 'react';
import './form.css';

export class CreateActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Activities:  [],
      categories:[],
      message:"",
      isLoadedCat:false,
      startDate:''
     };
     this.handleSubmit=this.handleSubmit.bind(this);
  }
//-------------------------------------------------CREATE AN ACTIVITY-----------------------------------------------------------
handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const formData={
    act_name:data.get('act_name'),
    act_date:data.get('act_date'),
    act_duration:data.get('hrs')+":"+data.get('mins'),
    user_id:parseInt("1",10),
    cat_id:parseInt(data.get('cat_id'),10)
  };
  console.log(JSON.stringify(formData));
    const url="http://localhost:8080/Activity/addActivity";
      fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body:  JSON.stringify(formData)                                           
            })
            .then(res => res.status)
            .then(response => {this.setState({message:"Activity added Successfully..."})})
            .catch(error => {this.setState({message:error.message})});
  }
//----------------------------------------TO SHOW ALL CATEGORIES----------------------------------------------------------------
  componentDidMount = () => {
    const url = 'https://my.api.mockaroo.com/category?key=1b58ac10';
    fetch(url)
      .then(res => res.json())
      .then( 
        (result) => {
            this.setState({
                categories: result,
                isLoadedCat: true
            });
        },
        // Note: it's important to handle errors here
        (errorCat) => {
          this.setState({
            isLoaded: true,
            errorCat
          });
        }
    )
  }  

  
//---------------------------------------------------RENDER FUNCTION------------------------------------------------------------  
  render() {
        const { errorCat, isLoadedCat } = this.state
        if (errorCat) {
            return <div>Error: {errorCat.message}</div>;
        } 
        else if (!isLoadedCat) {
            return <div>Loading...</div>;
        }
        else {
            let options = this.state.categories.map(function(val, index){ 
                return (
                <option key={val.cat_id} value={val.cat_id}>{val.cat_name}</option>
                ); 
            }) 
//--------------------------------------------------TO SET CURRENT DATE---------------------------------------------------------
              var today=new Date();
              var yyyy=today.getFullYear();
              var mm=("0"+(today.getMonth()+1)).slice(-2);
              var dd=("0"+today.getDate()).slice(-2);
              var date=yyyy+"-"+mm+"-"+dd;
              console.log(date);
            return (
                <div className="formData">
                    <form onSubmit={this.handleSubmit}>
                    <h2>Add Activity</h2>
                    <div id="message">{this.state.message}</div><br></br><br></br>
                   <label htmlFor="act_name">Activity Name</label>
                   <input type="text" id="act_name" name="act_name" placeholder="Activity Name" required/>
                   <br></br><br></br><br></br>
                   <label htmlFor="act_date">Activity Date</label>
                   <input type="date" defaultValue={date} id="act_date" name="act_date"  />
                   <br></br><br></br><br></br>
                   <label htmlFor="act_time">Activity Duration</label>
                   <input id='mins' name='mins' placeholder="mm" required type='number' min='0' max='59'/>
                   <span>:</span>
                   <input id='hrs' name='hrs'  placeholder="hh" required type='number' min='0' max='24'/>
                   <br></br><br></br><br></br>
                   <label htmlFor="cat_id">Category</label>
                   <select id="cat_id" name="cat_id">
                     <option defaultChecked value="0">------Category-------</option>
                       {options}
                   </select><br></br><br></br><br></br>
                   <button type="submit" >Add</button>
                   <button type="reset">Reset</button>
                   </form>
                </div>    
            );
          
        }    
    }
}

export default CreateActivity;