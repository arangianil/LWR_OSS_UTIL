import { LightningElement } from "lwc";
const CRV_VARIANTS = [
    {
        variant:"VTi",
        price:38900,
        formattedPrice:"$38,900",
        fuelConsumption:7,
        seatingCapacity:5,
        checked:true,
        allowWheels:17,
        imageName:"ignite_red"
    },    {
        variant:"VTi 7",
        price:40900,
        formattedPrice:"$40,900",
        fuelConsumption:7.3,
        seatingCapacity:7,
        allowWheels:17,
        imageName:"ignite_red"
    },    {
        variant:"VTi X",
        price:41900,
        formattedPrice:"$41,900",
        fuelConsumption:7.3,
        seatingCapacity:6,
        allowWheels:18,
        imageName:"ignite_red"
    },    {
        variant:"VTi LX AWD",
        price:53900,
        formattedPrice:"$53,900",
        fuelConsumption:7.4,
        seatingCapacity:5,
        allowWheels:18,
        imageName:"ignite_red"
    }
]
const COLORS=[
    {label:"Ignite red (metallic)", value:"ignite_red", checked:true },
    {label:"Brilliant Sporty Blue", value:"sporty_blue"},
    {label:"Crystal Black", value:"crystal_black"},
    {label:"Platinum White (Pearlescent)", value:"platinum_white"}
]

const ANIMATED_STARTING_PRICE = 38000;
export default class BuildAndPrice extends LightningElement {
    showModal=false
    crvVariants = CRV_VARIANTS
    colorsList=COLORS
    selectedVariant = CRV_VARIANTS[0]
    selectedPrice=this.selectedVariant.price
    selectedImageName=this.colorsList[0].value
    selectedColorName=this.colorsList[0].label
    animatedPriceValue


    connectedCallback(){
        this.animatePrice()
    }

    //handler for selecting variants of car
    selectionHandler(event){
        console.log("selected record ",event.detail.selected)
        console.log("selected record ",event.detail.variant)
        const {selected,variant}=event.detail
        this.selectedVariant={...selected, imageName:this.selectedImageName}
        this.selectedPrice=this.selectedVariant.price
        this.updateVariants(variant)
        this.animatePrice()
    }

    //handler for color selection 
    colorSelectionHandler(event){
        console.log("selected color ",event.detail)
        this.selectedImageName=event.detail
        this.selectedVariant = {...this.selectedVariant, imageName:this.selectedImageName}
        this.updateColors(this.selectedImageName)

    }
    //update the colors based on selected and checked colors
    updateColors(value){
        this.colorsList=this.colorsList.map(item=>{
            let checked=this.item.value === value
            if(checked){
                this.selectedColorName=item.label
            }
            return {...item, checked}
        })
    }

    //update the variants based on selected variant 
    updateVariants(value){
        this.crvVariants=this.crvVariants.map(item=>{
            let checked=item.variant === value
            return {...item, checked}
        })

    }
    //modal pop open
    openModalHandler(){
        this.showModal=true;
    }
    cancelHandler(){
        this.showModal=false;
    }
    submitHandler(){
        console.log("form submitted successfully");
    }
    

    //animated price value for footer
    animatePrice(){
        this.animatedPriceValue = ANIMATED_STARTING_PRICE
        let interval = window.setInterval(()=>{
            if(this.selectedPrice !== this.animatedPriceValue){
                this.animatedPriceValue = this.animatedPriceValue + 100
            }
            else{
               window.clearInterval(interval)
            }
        },10)
    }
}