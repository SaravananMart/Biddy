import React, { Component } from 'react';
import axios from 'axios';

import { Redirect } from 'react-router-dom'
import { Paper,Table,TableHead,TableBody,TableRow,TableCell, Button,TextField,Grid} from '@material-ui/core'
import Close from '@material-ui/icons/Close';
import  './ProductListPage.css';
import Header from './Header'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css';
import ProductCard from './ProductCard'

const style = {
    Paper:{
        height:500,
        marginTop:20,
        marginLeft:10,

    }
}

class ProductListPage extends Component{
  componentDidMount(){
      if(localStorage.getItem('token')!==null){
          this.setState({redirect:false})
          axios.get(`http://localhost:3000/products`,
              {
                  headers:{
                      Authorization: localStorage.getItem('token')
                  }
              })
              .then(function (response) {
                  console.log(response.data)
                  this.setState({list: response.data.products, count: response.data.count });
              }.bind(this))
              .catch(function (error) {
                  console.log(error);
              })
      }
      if(localStorage.getItem('token')===null) {
          this.setState({redirect:true})
      }
  }
  constructor () {
    super()
    this.state = {
        collapse: false,
        searchValue: '',
        list: [],
        count: [],
        redirect:false,
        auth: true,
        anchorEl: null,
        modalIsOpen: false,
        fields:{
            discount:'',
            startDate:moment(),
            endDate:moment().add(1, 'days')
        },
        product:'',
        errors:{},
        addItemModel: false,
        itemName: '',
        nights:1,
        color:''
    }
  }

  handleChange = (e) => {
    console.log(e.target)
    e.preventDefault()
        this.setState({
        searchValue: e.target.value,
      });
      if(this.state.searchValue.length < 2){
          axios.get(`http://localhost:3000/products`,
              {
                  headers:{
                      Authorization: localStorage.getItem('token')
                  }
              })
              .then(function (response) {
                  console.log(response.data)
                  this.setState({list: response.data.products, count: response.data.count });
              }.bind(this))
              .catch(function (error) {
                  console.log(error);
              })
      }
      else {
          this.getProduct()
      }

    }

    handleChangeAdd = (e) => {
      e.preventDefault()
      this.setState({
        itemName: e.target.value,
      });

    }

    addItem = (e) => {
      axios.post('http://localhost:3000/products', {
          name: this.state.itemName,
        })
        .then(function (response) {
         if(response.status === 200){
          this.closeModal();
         }
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
    }

    getProduct(){
        axios.get(`http://localhost:3000/products?q=${this.state.searchValue}`,
            {
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
            .then(function (response) {
                console.log(response.data)
                this.setState({list: response.data.products, count: response.data.count });
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            })
  }


  handleLogout = (e)=>{
    e.preventDefault()
    localStorage.removeItem('token')
    this.setState({redirect:true})
    }

  renderTable() {
      let  list = this.state.list
        if (list !== undefined) {
            return (
                <TableBody>
                    {
                        list.map(n => {
                            return (
                                <TableRow key={`${n.name}`}>
                                    <TableCell>{n.name}</TableCell>
                                    <TableCell><Button onClick={()=>this.openModal(n)}>Bid</Button></TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            )
        }
    }

    openModal = (n)=> {
      if(n ==="add_item") {
        this.setState({addItemModel: true});
        this.setState({modalIsOpen: true});
      }
      else {
        this.setState({modalIsOpen: true});
        this.setState({product:n})
        // console.log(name)
      }
    }

    afterOpenModal = () => {
        // this.subtitle.style.color = 'blue';
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
        this.setState({addItemModel: false});
        this.setState({discount:''})
    }
    handleFormFieldChange =(e)=>{
        let state= this.state.fields
        state[e.target.name]=e.target.value
        this.setState(state)
    }

    renderAddItemForm = () =>(
        <form>
            <Button variant="fab" mini color="secondary" aria-label="Add"  onClick={()=>this.closeModal()}>
                <Close />
            </Button>
            <p></p>
            <TextField name='searchValue' label={'Enter Product Name'} onChange={(e)=>this.handleChangeAdd(e)} /><br/><br/>
             <p></p>
             <div className='center'>
                <Button color='primary' variant="contained" onClick={(e)=>this.addItem(e)} >Add</Button>
            </div>
        </form>
    )
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["discount"]) {
            formIsValid = false;
            errors["discount"] = "Discount is required!";
        }
        if(fields['discount'] < 1 || fields['discount'] > 99){
            formIsValid = false
            errors['discount'] = 'Discount greater than 1 and Less than 100'
        }
        this.setState({errors:errors})
        return formIsValid
    }
    render(){
      const { redirect,list} = this.state
    if(!redirect){
        return(
       <div>
            <Header handleClick={this.handleLogout}/>
        {/*<img src={logo} style={image} alt={'logo'}/>*/}
           <Grid container spacing={24}>
               <Grid item xs={3} style={{height:500}}>
                   <Paper style={style.Paper}>

                   </Paper>
                   <Button onClick={()=>this.openModal("add_item")}>Add Item</Button>
               </Grid>
               <Grid item xs={9}>
                   <Paper style={{height:500,overflowY:'scroll',marginTop:20}}>
                       {(list)?(list.map(l=>
                           <div>
                               {/*<Grid item xs={3}>*/}
                                <ProductCard product={l} key={l.id}/>
                               {/*</Grid>*/}
                           </div>))
                           :(<div>loading</div>)}
                   </Paper>
                </Grid>
           </Grid>
        </div>
      );
    }
    if(this.state.redirect){
        return <Redirect to={'/'}/>
      }
  }

}


// const image = {
//   'height' : '100px',
//   'width' : '150px'
// }


export default ProductListPage;
