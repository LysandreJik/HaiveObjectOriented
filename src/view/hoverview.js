/*
__/\\\________/\\\_____/\\\\\\\\\_____/\\\\\\\\\\\__/\\\________/\\\__/\\\\\\\\\\\\\\\_
 _\/\\\_______\/\\\___/\\\\\\\\\\\\\__\/////\\\///__\/\\\_______\/\\\_\/\\\///////////__
  _\/\\\_______\/\\\__/\\\/////////\\\_____\/\\\_____\//\\\______/\\\__\/\\\_____________
   _\/\\\\\\\\\\\\\\\_\/\\\_______\/\\\_____\/\\\______\//\\\____/\\\___\/\\\\\\\\\\\_____
    _\/\\\/////////\\\_\/\\\\\\\\\\\\\\\_____\/\\\_______\//\\\__/\\\____\/\\\///////______
     _\/\\\_______\/\\\_\/\\\/////////\\\_____\/\\\________\//\\\/\\\_____\/\\\_____________
      _\/\\\_______\/\\\_\/\\\_______\/\\\_____\/\\\_________\//\\\\\______\/\\\_____________
       _\/\\\_______\/\\\_\/\\\_______\/\\\__/\\\\\\\\\\\______\//\\\_______\/\\\\\\\\\\\\\\\_
        _\///________\///__\///________\///__\///////////________\///________\///////////////__

	HAIVE web application - GUI Version 0.0.2 (OO)
	For Molcure product
	Base sketch by Lisan
	http://molcure.com
	Author: Lysandre Debut
*/

import React from 'react';

const gv = require('../../const/global');

/**
 * A very important class for the Protocol design. Every lightbox summoned during the timeline creation is here.
 */
export class Hoverview extends React.Component{
	constructor(props){
		super(props);
		this.state = {disabled:"",
            blockDropped:"",
            selectingTip:"none",
            quantity:"none",
            wait:false,
            depositLiquid:"none",
            depositLiquidSpecs:"none",
            pipetting:"none",
            pipettingSelector:'none',
            mergeGroup:false,
            notes:false
        };
		this.getLiquid = this.getLiquid.bind(this);
		this.clearAll = this.clearAll.bind(this);
		this.getQuantitySelector = this.getQuantitySelector.bind(this);
		this.setQuantitySelector = this.setQuantitySelector.bind(this);
		this.setPipettingSelector = this.setPipettingSelector.bind(this);
		this.getPipettingSelector = this.getPipettingSelector.bind(this);
		this.displayNotes = this.displayNotes.bind(this);
		this.mergeGroup = this.mergeGroup.bind(this);
		gv.hoverview = this;
	}

	clearAll() {
        this.setState({
            disabled:"",
            blockDropped:"",
            selectingTip:"none",
            quantity:"none",
            wait:false,
            depositLiquid:"none",
            depositLiquidSpecs:"none",
            pipetting:"none",
            pipettingSelector:'none',
            mergeGroup:false,
            notes:false
        });
    }

	getLiquid(tip){
		this.clearAll();
		this.setState({selectingTip:tip});
		setTimeout(function(){window.location="#wait"},10);
	}

	depositLiquid(tip){
		this.clearAll();
		this.setState({depositLiquid:tip});
		setTimeout(function(){window.location="#deposit"},10);
	}

	pipetting(tip){
		this.clearAll();
		this.setState({pipetting:tip});
		setTimeout(function(){window.location="#deposit"},10);
	}


	depositLiquidSpecs(tip){
		this.clearAll();
		this.setState({depositLiquidSpecs:[tip, this.state.depositLiquid]});
		setTimeout(function(){window.location="#depositliquid"},10);
	}

	getQuantitySelector(tip){
		this.clearAll();
		this.setState({quantity:tip});
		setTimeout(function(){window.location="#qselect"},10);
	}

	setQuantitySelector(tip){
		this.setState({quantity:tip});
	}

	getPipettingSelector(tip){
		this.clearAll();
		this.setState({pipettingSelector:tip});
		setTimeout(function(){window.location="#pipetting"},10);
	}

	setPipettingSelector(tip){
		this.setState({pipettingSelector:tip});
	}

	wait(){
		this.clearAll();
		this.setState({wait:true});
		setTimeout(function(){window.location="#wait"},10);
	}

    mergeGroup(){
        this.clearAll();
        this.setState({mergeGroup:true});
        setTimeout(function(){window.location="#merge"},10);
    }

    renameGroup(){
        this.clearAll();
        this.setState({renameGroup:true});
        setTimeout(function(){window.location="#merge"},10);
    }

    displayNotes(block){
        this.clearAll();
        this.setState({notes:block});
        setTimeout(function(){window.location="#notes"}, 10);
    }

	render(){
		if(this.state.selectingTip != "none"){
			return <TipSelect container={this.state.selectingTip} selected={this.getQuantitySelector} that={this}/>;
		}

		if(this.state.depositLiquid != "none"){
			return <DepositLiquid container={this.state.depositLiquid} block={gv.protocolDesignController.droppedBlock} parent={this}/>;
		}

		if(this.state.depositLiquidSpecs != "none"){
			return <DepositLiquidNew parent={this} container={this.state.depositLiquidSpecs[1]} tip={this.state.depositLiquidSpecs[0]} block={gv.protocolDesignController.droppedBlock}/>;
		}

		if(this.state.quantity != "none"){
			return <QuantitySelector quantity={this.state.quantity}/>;
		}

		if(this.state.pipettingSelector != "none"){
			return <Pipetting parent={this} container={this.state.depositLiquid} tip={this.state.pipettingSelector} block={gv.protocolDesignController.droppedBlock}/>;
		}

		if(this.state.pipetting != "none"){
			return <TipSelect container={this.state.pipetting} selected={this.getPipettingSelector} that={this}/>;
		}

        if(this.state.mergeGroup == true){
            return <MergeGroup/>;
        }

        if(this.state.renameGroup == true){
            return <MergeGroup rename={true}/>;
        }

		if(this.state.wait != ""){
			return <Wait block={this.state.wait}/>;
		}

		if(this.state.notes != false){
		    return <Notes super={this} block={this.state.notes}/>
        }

		return <div></div>;
	}
}

/**
 * The component which allows the user to write down notes.
 */
class Notes extends React.Component{

    componentDidMount(){
        document.getElementById("notestextarea").value = this.props.block.getComment();
    }

    render(){
        let parent = this;
        return(
            <div className="lightbox" id="notes">
                <textarea id="notestextarea" className={"notes"}>

                </textarea>
                <div className={"notesbuttonscontainer"}>
                    <button className={"btnghostdarker notesbuttons"} onClick={
                        function(){
                            parent.props.block.setComment(document.getElementById("notestextarea").value);
                            console.log(parent.props.block);
                            parent.props.super.clearAll();
                            window.location="#_";
                            gv.protocolDesignView.refresh();
                        }
                    }>Save and exit</button>
                    <button className={"btnghostdarker notesbuttons"} onClick={function(){parent.props.super.clearAll();window.location="#_"}}>Discard and exit</button>
                </div>

            </div>
        )
    }
}

/**
 * Component which allows the user to specify the information of the group he just created.
 */
class MergeGroup extends React.Component{
    render(){
        let parent = this;
        return(
            <div className="lightbox" id="merge">
                <div id="warning_div" className="pipettetipsdialog warning">
                    <span>Merge the selected blocks in a single block</span>
                    <label htmlFor="field1" style={{"margin":"20px"}}>
                        <span id="waitspan">Please enter a name for this block</span>
                        <input id="wait_textfield" type="text" name="field1" required="true"/>
                    </label>
                    <button onClick={function(){
                        if(parent.props.rename == true){
                            gv.protocolDesignController.renameMegablock($("#wait_textfield").val())
                        }else{
                            gv.protocolDesignController.defineSingleBlock($("#wait_textfield").val())
                        }

                    }}>Ok</button>
                    <button onClick={function(){window.location="#_"}}>Cancel</button>
                </div>
            </div>
        );
    }
}

/**
 * Component which allows the user to enter the amount of time on the block
 */
class Wait extends React.Component{
	render(){
		const parent = this;
		return(
			<div className="lightbox" id={"wait"}>
				<div id="warning_div" className="pipettetipsdialog warning">
					<span>WAIT</span>
					<label htmlFor="field1" style={{"margin":"20px"}}>
						<span id="waitspan">Please enter a duration in seconds</span>
						<input id="wait_textfield" type="text" name="field1" required="true"/>
					</label>
					<button onClick={() => gv.protocolDesignController.defineWait(parent)}>Ok</button>
				</div>
			</div>
		);
	}
}

/**
 * Component which allows the user to enter all the information about the liquid he is going to deposit.
 */
class DepositLiquid extends React.Component{
	render(){
		return(
			<div className="lightbox" id={"deposit"}>
				<div className="tipselect animated fadeInLeft">
					<h1>{this.props.container.getType()}</h1>

					<div className="divgrid">
						{this.props.container.getNonEmptyTestTubes().map(function(block, index){
							return (
								<div key={index} className={"divfullinfo"} onClick={
										function(){
											gv.hoverview.depositLiquidSpecs(block);
										}
									}>

									<div className="divcolorcircle">
										<img src={"images/containers/container_info/circles/circle_"+block.getColor()+".png"} />
									</div>

									<div className="divtextinfo">
										<span>{"\u00a0"+block.getLiquid()}</span>
										<br></br>
										<span>{"\u00a0"+(block.isViscous()?"Viscous liquid":"Aqueous liquid")}</span>
										<br></br>
										<span>{"\u00a0Quantity : "+block.getLiquidAmount()}</span>
										<span>{block.getAmountUnit()}</span>
										<br></br>
									</div>
								</div>
							);
						})}
						<div className={"divfullinfo"} onClick={
								function(){
									gv.hoverview.depositLiquidSpecs("new");
								}
							}>

							<div className="divtextinfo">
								<span>{"Add liquid to new test tube"}</span>
							</div>
						</div>

					</div>
					<button className="btnghostlighter" style={{"position":"fixed", "bottom":"3%", "right":"3%"}} onClick={gv.protocolDesignController.cancelGetLiquid}>Cancel</button>
				</div>

			</div>

		);
	}
}

/**
 * Component which allows the user to enter the quantity he desires from a certain liquid.
 */
class QuantitySelector extends React.Component{
	render(){
        const parent = this;
        return(
			<div className="lightbox" id={"qselect"}>
				<div id="warning_div" className="pipettetipsdialog qselect animated fadeIn">
					<label htmlFor="field1" style={{"marginBottom":"5%"}}>
						<span id="liquidtype_pipettetipsdialogspan">{"Amount of "+this.props.quantity.getLiquid()+" - Max : "+this.props.quantity.getLiquidAmount()+this.props.quantity.getAmountUnit()}</span><input id="quantityselectorquantity" type="text" name="field1" required="true" />
					</label>

					<ul id="pipettetipsdialogunit" className="donate-now">
					<li>
						<input type="radio" id="a25" name="amount" onClick={function(){gv.currentlySelectedDimension="uL"}}/>
						<label className="labelmarginbottom" htmlFor="a25">uL</label>
					</li>
					<li>
						<input type="radio" id="a50" name="amount" defaultChecked="true" onClick={function(){gv.currentlySelectedDimension="mL"}}/>
						<label className="labelmarginbottom" htmlFor="a50">mL</label>
					</li>
					</ul>

					<label>
						<input type="button" value="Validate" onClick={
							function(){
								if(gv.temporaryLiquidQuantity[0] != 0){
									gv.temporaryLiquidQuantity[2].removeLiquid(gv.temporaryLiquidQuantity[0], gv.temporaryLiquidQuantity[1]);
									gv.temporaryLiquidQuantity = [0,0,0];
								}
								gv.protocolDesignController.addBlockContainingTip(parent.props.quantity, parent);

							}
						}/>{"\u00a0\u00a0\u00a0"}
					</label>
					<label>
						<input type="button" value="Cancel" onClick={
							function(){
								gv.hoverview.getLiquid(parent.props.quantity.getContainer());
								if(gv.temporaryLiquidQuantity[0] != 0){
									gv.temporaryLiquidQuantity[2].removeLiquid(gv.temporaryLiquidQuantity[0], gv.temporaryLiquidQuantity[1]);
									gv.temporaryLiquidQuantity = [0,0,0];
								}
							}}/>{"\u00a0\u00a0\u00a0"}
					</label>
				</div>
			</div>
		);
	}
}

/**
 * Component which allows the user to enter all the information about the pipetting operation.
 */
class Pipetting extends React.Component{
	constructor(props){
		super(props);
		this.changeSelectColor = this.changeSelectColor.bind(this);
	}

	changeSelectColor(){
		this.props.tip.setColor(document.getElementById("pipettetipsdialogcolorselect").value);
        const x = document.getElementById("pipettetipsdialogcolorselect").value;
        if(x == 'Orange'){
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "orange";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "white";
		}else if (x == "Blue") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "blue";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "white";
		}else if (x == "Green") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "green";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "white";
		}else if (x == "Yellow") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "yellow";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "black";
		}else if (x == "Cyan") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "cyan";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "black";
		}else if (x == "Magenta") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "magenta";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "black";
		}else if (x == "Purple") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "purple";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "black";
		}
	}

	render(){
        const parent = this;

        let pos = "ag";
        $("#depositliquid_name").val(parent.props.tip.getLiquid());
		return(

			<div className="lightbox" id={"pipetting"}>
				<form id="pipettetipdialog" className="pipettetipsdialog pipettingdialog warning" method="post">

					<label htmlFor="field1">
						<span id="liquidnamepipetting">Specify a new name for the liquid</span><input style={{"width":"20vw"}} id="depositliquid_name" type="text" name="field1" required="true" defaultValue={parent.props.tip.getLiquid()}/>
					</label>

					<ul className="donate-now biglist">
					<li>
						<input type="radio" id="v_A" name="viscous_aqueous" defaultChecked={!parent.props.tip.isViscous()} onClick={function(){parent.props.tip.setViscous(false);}}/>
						<label className="labelmarginbottom" htmlFor="v_A">Aqueous</label>
					</li>
					<li>
						<input type="radio" id="v_V" name="viscous_aqueous" defaultChecked={parent.props.tip.isViscous()} onClick={function(){parent.props.tip.setViscous(true);}}/>
						<label className="labelmarginbottom" htmlFor="v_V">Viscous</label>
					</li>
					</ul>

                    <label htmlFor="field2">
                        <span id="tippositionpipetting">{"Position of the tip while pipetting (in mm)"}</span><input style={{"width":"20vw"}} id="tippos_val" type="text" name="field2" required="true" />

                        <ul id="pipettetipsdialogunit" className="donate-now">
                            <li style={{"width":"130px"}}>
                                <input type="radio" id="bs" name="amount" onClick={function(){pos="bs";}}/>
                                <label className="labelmarginbottom" htmlFor="bs">BELOW SURFACE</label>
                            </li>
                            <li style={{"width":"130px"}}>
                                <input type="radio" id="ag" name="amount" defaultChecked="true" onClick={function(){pos="ag";}}/>
                                <label className="labelmarginbottom" htmlFor="ag">ABOVE GROUND</label>
                            </li>
                        </ul>
                    </label>

                    <label htmlFor="field3">
                        <span id="nprcent">{"Redial pipette to n% of total liquid. n = "}</span><input style={{"width":"20vw"}} id="nprcent_val" type="text" name="field2" required="true" />
                        <span id="xprcent">{"Mix with x% of total liquid. x = "}</span><input style={{"width":"20vw"}} id="xprcent_val" type="text" name="field2" required="true" /><br></br>
                        <span id="nbriterations">{"Number of iterations"}</span><br></br><input style={{"width":"20vw"}} id="nbriterations_val" type="text" name="field3" required="true" />
                    </label>

					<label>
						<input type="button" value="Validate" onClick={
								function(){
                                    let n = $('#nprcent_val').val();
                                    let x = $('#xprcent_val').val();
                                    let i = $('#nbriterations_val').val();;
                                    
									if((/^\d*[,.]\d+$/.test(n) || /^\d+$/.test(n)) && n > 0 && n < 100){
                                        if((/^\d*[,.]\d+$/.test(x) || /^\d+$/.test(x)) && x > 0 && x < 100){
                                            if(/^\d*[,.]\d+$/.test($('#tippos_val').val()) || /^\d+$/.test($('#tippos_val').val())){
                                                if((/^\d*[,.]\d+$/.test(i) || /^\d+$/.test(i)) && n > 0){
                                                    gv.protocolDesignController.definePipetting(parent, pos);
                                                }else{
                                                    $('#nbriterations_val').val("Only positive numbers are accepted");
                                                }
                                            }else{
                                                $('#tippos_val').val("Only numbers are accepted");
                                            }
                                        }else{
                                            $('#xprcent_val').val("Only numbers between 0 and 100 are accepted");
                                        }
									}else{
										$('#nprcent_val').val("Only numbers between 0 and 100 are accepted");
									}
								}
							}/>{"\u00a0\u00a0\u00a0"}
					</label>

					<label>
						<input type="button" value="Cancel" onClick={function(){window.location="#_";gv.protocolDesignController.timeline.removeBlock(gv.protocolDesignController.timeline.getIndexOf(parent.props.block));gv.protocolDesignView.refresh()}}/>
					</label>

					<select id="pipettetipsdialogcolorselect" className="pipettetipsdialogcolorselect" defaultValue="blue" onChange={this.changeSelectColor}>
						<option defaultValue="selected" id="blue">Blue</option>
						<option id="orange">Orange</option>
						<option id="yellow">Yellow</option>
						<option id="green">Green</option>
						<option id="cyan">Cyan</option>
						<option id="magenta">Magenta</option>
						<option id="purple">Purple</option>
					</select>
				</form>
			</div>
		);
	}
}


/**
 * Component which allows the user to enter all the information about the liquid he is going to deposit.
 */
class DepositLiquidNew extends React.Component{
	constructor(props){
		super(props);
		if(this.props.tip == "new"){
			this.tip = this.props.container.getEmptyTestTubes()[0];
		}
		this.type = "mL";
		this.changeSelectColor = this.changeSelectColor.bind(this);
	}

	changeSelectColor(){
		if(this.props.tip == "new"){
			this.tip.setColor(document.getElementById("pipettetipsdialogcolorselect").value);
		}else{
			this.props.tip.setColor(document.getElementById("pipettetipsdialogcolorselect").value);
		}

        const x = document.getElementById("pipettetipsdialogcolorselect").value;
        if(x == 'Orange'){
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "orange";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "white";
		}else if (x == "Blue") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "blue";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "white";
		}else if (x == "Green") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "green";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "white";
		}else if (x == "Yellow") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "yellow";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "black";
		}else if (x == "Cyan") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "cyan";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "black";
		}else if (x == "Magenta") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "magenta";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "black";
		}else if (x == "Purple") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "purple";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "black";
		}
	}

	render(){
        const parent = this;
        if(this.props.tip != "new"){
			$("#depositliquid_name").val(parent.props.tip.getLiquid());
			return(
				<div className="lightbox" id={"depositliquid"}>
					<form id="pipettetipdialog" className="pipettetipsdialog warning" method="post">

						<label htmlFor="field1">
							<span id="liquidtype_pipettetipsdialogspan">Specify a new name for the liquid</span><input id="depositliquid_name" type="text" name="field1" required="true" defaultValue={parent.props.tip.getLiquid()}/>
						</label>

						<ul className="donate-now biglist">
						<li>
							<input type="radio" id="v_A" name="viscous_aqueous" defaultChecked={!parent.props.tip.isViscous()} onClick={function(){parent.props.tip.setViscous(false);}}/>
							<label className="labelmarginbottom" htmlFor="v_A">Aqueous</label>
						</li>
						<li>
							<input type="radio" id="v_V" name="viscous_aqueous" defaultChecked={parent.props.tip.isViscous()} onClick={function(){parent.props.tip.setViscous(true);}}/>
							<label className="labelmarginbottom" htmlFor="v_V">Viscous</label>
						</li>
						</ul>

						<label htmlFor="field2">
							<span id="liquidamount_pipettetipsdialogspan">{"Amount of liquid to add (Max:"+gv.protocolDesignController.timeline.getCurrentlyHeldLiquidQuantity()[0]+gv.protocolDesignController.timeline.getCurrentlyHeldLiquidQuantity()[1]+")"}</span><input id="depositliquid_amount" type="text" name="field2" required="true" />

							<ul id="pipettetipsdialogunit" className="donate-now">
							<li>
								<input type="radio" id="a25" name="amount" defaultChecked={parent.type == "uL"} onClick={function(){parent.type="uL";console.log("Set amount unit to "+parent.type+" for", parent.props.tip)}}/>
								<label className="labelmarginbottom" htmlFor="a25">uL</label>
							</li>
							<li>
								<input type="radio" id="a50" name="amount" defaultChecked={parent.type == "mL"} onClick={function(){parent.type="mL";console.log("Set amount unit to "+parent.type+" for", parent.props.tip)}}/>
								<label className="labelmarginbottom" htmlFor="a50">mL</label>
							</li>
							</ul>
						</label>

						<label>
							<input type="button" value="Validate" onClick={
									function(){
									    console.log(parent.type);
										if(/^\d*[,.]\d+$/.test($('#depositliquid_amount').val()) || /^\d+$/.test($('#depositliquid_amount').val())){
											gv.protocolDesignController.defineDepositLiquid(parent, parent.type, false);
											gv.protocolDesignController.lightenLiquidContainers();
										}else{
											$('#liquidamount_pipettetipsdialogspan').val("Amount of liquid to add - Only numbers are accepted")
										}
									}
								}/>{"\u00a0\u00a0\u00a0"}
						</label>

						<label>
							<input type="button" value="Cancel" onClick={
							    function(){
							        window.location="#_";
							        console.log("yeah");
							        gv.protocolDesignController.timeline.removeBlock(gv.protocolDesignController.timeline.getIndexOf(parent.props.block));
                                    gv.protocolDesignController.lightenLiquidContainers();
                                    gv.protocolDesignView.setState({disabled:""});
                                    gv.protocolDesignController.droppedBlock = "";
                                    gv.hoverview.clearAll();
							        gv.protocolDesignView.refresh();
							    }}/>
						</label>

						<select id="pipettetipsdialogcolorselect" className="pipettetipsdialogcolorselect" defaultValue="blue" onChange={this.changeSelectColor}>
							<option defaultValue="selected" id="blue">Blue</option>
							<option id="orange">Orange</option>
							<option id="yellow">Yellow</option>
							<option id="green">Green</option>
							<option id="cyan">Cyan</option>
							<option id="magenta">Magenta</option>
							<option id="purple">Purple</option>
						</select>
					</form>
				</div>
			);
		}else{
            const container = this.props.container;
            console.log(container);
            var type = "mL";

			return(
				<div className="lightbox" id={"depositliquid"}>
					<form id="pipettetipdialog" className="pipettetipsdialog warning" method="post">

						<label htmlFor="field1">
							<span id="liquidtype_pipettetipsdialogspan">Specify a name for the liquid</span><input id="depositliquid_name" type="text" name="field1" required="true" defaultValue="BLANK LIQUID"/>
						</label>

						<ul className="donate-now biglist">
						<li>
							<input type="radio" id="v_A" name="viscous_aqueous" defaultChecked={!this.tip.isViscous()} onClick={function(){parent.tip.setViscous(false);}}/>
							<label className="labelmarginbottom" htmlFor="v_A">Aqueous</label>
						</li>
						<li>
							<input type="radio" id="v_V" name="viscous_aqueous" defaultChecked={this.tip.isViscous()} onClick={function(){parent.tip.setViscous(true);}}/>
							<label className="labelmarginbottom" htmlFor="v_V">Viscous</label>
						</li>
						</ul>

						<label htmlFor="field2">
							<span id="liquidamount_pipettetipsdialogspan">{"Amount of liquid to add (Max:"+gv.protocolDesignController.timeline.getCurrentlyHeldLiquidQuantity()[0]+gv.protocolDesignController.timeline.getCurrentlyHeldLiquidQuantity()[1]+")"}</span><input id="depositliquid_amount" type="text" name="field2" required="true" />

							<ul id="pipettetipsdialogunit" className="donate-now">
							<li>
								<input type="radio" id="a25" name="amount" onClick={function(){type="uL";console.log("Set amount unit to ul for", parent.tip)}}/>
								<label className="labelmarginbottom" htmlFor="a25">uL</label>
							</li>
							<li>
								<input type="radio" id="a50" name="amount" defaultChecked="true" onClick={function(){type="mL";console.log("Set amount unit to ml for", parent.tip)}}/>
								<label className="labelmarginbottom" htmlFor="a50">mL</label>
							</li>
							</ul>
						</label>

						<label>
							<input type="button" value="Validate" onClick={
									function(){
										if(/^\d*[,.]\d+$/.test($('#depositliquid_amount').val()) || /^\d+$/.test($('#depositliquid_amount').val())){
											gv.protocolDesignController.defineDepositLiquid(parent, type, parent.tip);
											gv.protocolDesignController.lightenLiquidContainers();
										}else{
											$('#liquidamount_pipettetipsdialogspan').val("Amount of liquid to add - Only numbers are accepted")
										}
									}
								}/>{"\u00a0\u00a0\u00a0"}
						</label>

						<label>
							<input type="button" value="Cancel" onClick={
							    function(){
							        window.location="#_";
							        gv.protocolDesignController.timeline.removeBlock(gv.protocolDesignController.timeline.getIndexOf(parent.props.block));
                                    gv.protocolDesignController.lightenLiquidContainers();
                                    gv.protocolDesignView.setState({disabled:""});
                                    gv.protocolDesignController.droppedBlock = "";
                                    gv.hoverview.clearAll();
                                    gv.protocolDesignView.refresh();
							    }}/>
						</label>

						<select id="pipettetipsdialogcolorselect" className="pipettetipsdialogcolorselect" defaultValue="blue" onChange={this.changeSelectColor}>
							<option defaultValue="selected" id="blue">Blue</option>
							<option id="orange">Orange</option>
							<option id="yellow">Yellow</option>
							<option id="green">Green</option>
							<option id="cyan">Cyan</option>
							<option id="magenta">Magenta</option>
							<option id="purple">Purple</option>
						</select>
					</form>
				</div>
			);
		}

	}
}

/**
 * Component which allows the user to select which tip he wants to take the liquid from or put the liquid in.
 */
class TipSelect extends React.Component{
	constructor(props){
		super(props);
		this.state = {quantity:"none"};
	}

	render(){
        const parent = this;
        return(
			<div className="tipselect animated fadeInLeft">
				<h1>{this.props.container.getType()}</h1>

				<div className="divgrid">
					{this.props.container.getNonEmptyTestTubes().map(function(block, index){
						return (
							<div key={index} className={"divfullinfo"} onClick={
									function(){
										parent.props.selected(block);
									}
								}>

								<div className="divcolorcircle">
									<img src={"images/containers/container_info/circles/circle_"+block.getColor()+".png"} />
								</div>

								<div className="divtextinfo">
									<span>{"\u00a0"+block.getLiquid()}</span>
								 	<br></br>
									<span>{"\u00a0"+(block.isViscous()?"Viscous liquid":"Aqueous liquid")}</span>
									<br></br>
									<span>{"\u00a0Quantity : "+block.getLiquidAmount()}</span>
									<span>{block.getAmountUnit()}</span>
									<br></br>
								</div>
							</div>
						);
					})}
				</div>

				<button className="btnghostlighter" style={{"position":"fixed", "bottom":"3%", "right":"3%"}} onClick={gv.protocolDesignController.cancelGetLiquid}>Cancel</button>
			</div>
		);
	}
}
