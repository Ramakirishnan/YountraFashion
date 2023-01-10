import { LightningElement, track, wire } from 'lwc';
import getProductInfo from '@salesforce/apex/YountraFashion.getProductInfo';
import ProductImages from '@salesforce/resourceUrl/ProductImages';
import backnavimage from '@salesforce/resourceUrl/backnavimage';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class YountraFashionProduct extends LightningElement {

    @track products = [];

    images = ProductImages + '/BlackTuxedo.png';

    selecteditem;
    selectedprice;
    selecteddesc;

    backnav = backnavimage;

    @track shipaddressdisplay=true;
    @track giftdisplay=true;
    @track carddetails=null;

    @track customerinfo=false;
    @track productinfo = true;

    //@track options = [{ label: 'Option1', value: 'option1'}, { label: 'Option2', value: 'option2'}];

    //value;

    shipaddressistrue(event){
        this.shipaddressdisplay = event.target.value;
        if(this.shipaddressdisplay === 'true'){
            this.shipaddressdisplay = true;
        }
        else{
            this.shipaddressdisplay = false;
        }
    }

    giftistrue(event){
        this.giftdisplay = event.target.value;
        if(this.giftdisplay === 'true'){
            this.giftdisplay = false;
        }
        else{
            this.giftdisplay = true;
        }
    }

    paymentselect(event){
        this.carddetails = event.target.value;
        if(this.carddetails === 'Card'){
            this.carddetails = true;
        }
        else{
            this.carddetails = false;
        }
    }
    
    @wire (getProductInfo) 
    wireddata({ data }) {
        if (data) {
            this.products = data;        
            console.log(this.products);
        }
    }

    handleClick(){

        
        const event = new ShowToastEvent({
            title: 'Success',
            message: 'Order Placed Successfully',
            variant: 'success',
            duration:' 5000',
            key: 'info_alt',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);

        //var targetElement = this.template.querySelector("[data-id='target']");
        //targetElement.className = "animate";

        this.productinfo=true;
        this.customerinfo = false;

    }

    back(){
        this.productinfo=true;
        this.customerinfo = false;
    }

    selected(event){
        //let idx=event.currentTarget.id;
        let idx=event.currentTarget.dataset.id;
        //console.log(this.images);
        let prod = this.products;
        let prods = prod.map(a => a.ImageSrc__c);
        let index = prods.indexOf(idx);
        
        this.selecteddesc=prod[index].Description__c;
        this.selecteditem=prod[index].ProductName__c;
        this.selectedprice=prod[index].Price__c;
        this.customerinfo=true;
        this.productinfo=false;

    }

    get monthoptions() {
        return [
                 { label: 'January', value: '1' },
                 { label: 'February', value: '2' },
                 { label: 'March', value: '3' },
                 { label: 'April', value: '4' },
                 { label: 'May', value: '5' },
                 { label: 'June', value: '6' },
                 { label: 'July', value: '7' },
                 { label: 'August', value: '8' },
                 { label: 'September', value: '9' },
                 { label: 'October', value: '10' },
                 { label: 'November', value: '11' },
                 { label: 'December', value: '12' },
               ];
    }

    get yearoptions() {
        const d = new Date();
        var year = d.getFullYear();
        var monthop = [];
        for(var i=0;i<20;i++){

            var obj = {};
            obj['label'] = year.toString();
            obj['value'] = year.toString();            
            monthop.push(obj);
            year = year+1;
            console.log(year);
        }

        return monthop;
    }

    get addressoptions() {
        return [
            { label: 'Yes', value: true },
            { label: 'No', value: false },
        ];
    }

    get giftoptions() {
        return [
            { label: 'Yes', value: true },
            { label: 'No', value: false },
        ];
    }

    get paymentoptions() {
        return [
            { label: 'Debit Card', value: 'Card' },
            { label: 'PayPal', value: 'PayPal' },
        ];
    }

    

    
    
}