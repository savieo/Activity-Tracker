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
//-------------------------------------------------UPDATE AN ACTIVITY-----------------------------------------------------------
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
  console.log(data.get("act_id"));
  console.log(JSON.stringify(formData));
    const url="http://localhost:8080/Activity/updateActivity/"+data.get("act_id");
      fetch(url, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body:  JSON.stringify(formData)                                           
            })
            .then(res => res.status)
            .then(response => {this.setState({message:"Activity updated Successfully..."})})
            .catch(error => {this.setState({message:error.message})});
  }
//---------------------------------------SEARCH AN ACTIVITY---------------------------------------------------------------------
searchActivity=(id)=>{
    const url = 'http://localhost:8080/Activity/getActivityByID/'+id;
    fetch(url)
      .then(res => res.json())
      .then( 
        (result) => {
            if(result===null){
                this.setState({
                    Activities: [],
                    message:"No Activity Found..."
                });  
            }
            else{
            this.setState({
                Activities: result,
            });
        }
        },
        // Note: it's important to handle errors here
        (error) => {
          this.setState({
            isLoaded: true,
            message:error.message
            
          });
        }
    )
}
//----------------------------------------TO SHOW ALL CATEGORIES----------------------------------------------------------------
  componentDidMount = () => {
      this.searchActivity(this.props.match.params.act_id);
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
            console.log(this.props.match.params.act_id);
            const [hrs,mins]=this.state.Activities.act_duration.split(':');
            //console.log(hrs);
              //console.log(date);
            return (
                <div className="formData">
                    <form onSubmit={this.handleSubmit}>
                    <h2>Edit Activity</h2>
                    <div id="message">{this.state.message}</div><br></br><br></br>
                   <label htmlFor="act_name">Activity Name</label>
                   <input type="text" id="act_name" defaultValue={this.state.Activities.act_name} name="act_name" placeholder="Activity Name" required/>
                   <br></br><br></br><br></br>
                   <label htmlFor="act_date">Activity Date</label>
                   <input type="date" id="act_date" defaultValue={this.state.Activities.act_date} name="act_date"  />
                   <br></br><br></br><br></br>
                   <label htmlFor="act_time">Activity Duration</label>
                   <input id='mins' name='mins' placeholder="mm" defaultValue={mins} required type='number' min='0' max='59'/>
                   <span>:</span>
                   <input id='hrs' name='hrs'  placeholder="hh" defaultValue={hrs} required type='number' min='0' max='24'/>
                   <br></br><br></br><br></br>
                   <label htmlFor="cat_id">Category</label>
                   <select id="cat_id" name="cat_id" defaultValue={this.state.Activities.cat_id}>
                     <option defaultChecked value="0">------Category-------</option>
                       {options}
                   </select><br></br><br></br><br></br>
                   <input type="hidden" value={this.props.match.params.act_id} name="act_id" id="act_id"></input>
                   <button type="submit" >Edit</button>
                   <button type="reset">Reset</button>
                   </form>
                </div>    
            );
          
        }    
    }
}

export default CreateActivity;