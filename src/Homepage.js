import React, { useState,useContext } from 'react';
import './Homepage.css';
import { AuthContext } from './context/AuthContext';
import apiRequest from './apiRequest';
import { useNavigate } from 'react-router-dom';


export const Homepage = () => {{
    const [choose,setChoose] = useState();
    const [minDate,setMinDate] = useState(getYesterdayDate());
    const [maxDate,setMaxDate] = useState(getSevenDate());
    const [isbetDay,setisBetDay] = useState(true);
    const [bg,setBg] = useState("");
    const myArray= bg.split('');
    const [big,setBig] = useState(0);
    const [small,setSmall] = useState(0);
    const [dummy,setDummy] = useState(false);
    const [gd, setGd] = useState(false);
    const [toto, setToto] = useState(false);
    const [magnum, setMagnum] = useState(false);
    const [dmc, setDmc] = useState(false);
    const stackArray = [gd,toto,magnum,dmc,dummy];
    const [stack,setStack] = useState(1);
    const [type,setType] = useState("nor");
    const [buys,setBuys] = useState([]);
    const {currentUser } = useContext(AuthContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    var sy,sc, sum,betTotal;
    sy= CountRollNum(myArray);
    sc = stackCount(stackArray);
    sum = parseInt(big) + parseInt(small);
    betTotal = countTotal(sum,stack,sc);
    let totalBuys = buys.reduce((accumulator,current)=>accumulator + current.sum,0);
    let bets = buys
    
    
    const handleSubmit = async(e) => {
        
        e.preventDefault();
        
        try {
            const res = await apiRequest.post("/posts",{
                postData:{
                    betDate: choose,
                    isGD: gd,
                    isMg:magnum,
                    isTt:toto,
                    isDmc:dmc,
                    total:parseInt(totalBuys),
                                },
                                bets
                                ,
            });
            navigate("/record")
        }catch(err){
            console.log(err);
            setError(err);
        }

    }

    function onSelectDate (event){
    setChoose(event.target.value);
  }

   function getYesterdayDate() {
    const tday = new Date();
    const tdayHour = tday.getHours();
    const yesteday = new Date(tday);
    if (tdayHour >= 19){
    yesteday.setDate(yesteday.getDate() + 1);}
    if (tdayHour <= 19){
        
    }
    return yesteday.toISOString().split('T')[0];
  }

  function getSevenDate() {
    const tody = new Date();
    const yeterday = new Date(tody);
    yeterday.setDate(yeterday.getDate() + 7);
    return yeterday.toISOString().split('T')[0];
  }


  
  function myFunction(event)
    {
        let value = event.charCode;
        if  ( value >=48 && value <= 57){
         return event.key; }
         else 
         { event.preventDefault();
         }

    }

    function mySet(event)
  {
    
    setBg(event.target.value);
     
  }

  function CountRollNum() {
    var nCount, n4D, D1, D2, D3, D4;
    let aSysNums = [0,1,6,12,24,4];
    
    n4D = myArray;
    if (n4D === "")
        return 0;
    D1 = n4D[0];
    D2 = n4D[1];
    D3 = n4D[2];
    D4 = n4D[3];
    nCount = 1;
    if (D2 !== D1) {
        nCount = nCount + 1;
    }
    if (D3 !== D1 && D3 !== D2) {
        nCount = nCount + 1;
    }
    if (D4 !== D1 && D4 !== D2 && D4 !== D3) {
        nCount = nCount + 1;
    }
    if (nCount === 2) {
        if ((D1 !== D2 && D1 !== D3 && D1 !== D4) || (D2 !== D1 && D2 !== D3 && D2 !== D4) || (D3 !== D1 && D3 !== D2 && D3 !== D4) || (D4 !== D1 && D4 !== D2 && D4 !== D3)) {
            nCount = 5;
        }
    }
    return aSysNums[nCount];
}


function click(event){
    const date = new Date(event.target.value);
    const day = date.getDay();
    if (day === 0 || day === 3 || day === 6 ){
     setisBetDay(false);
    }else {
     setisBetDay(true);
    }
}

function howStack(event){
    var etv;
    etv = event.target.value;
    if (etv == 1){
        setStack(1);
        setType("nor");
    }else if ( etv == 2 ){
        setStack(2);
        setType("ret");
    }else if ( etv == 3 ){
        setStack(sy);
        setType("box"); 
    }else if ( etv == 4 ){
        setStack(1);
        setType("ibox");
    }
}
function handleGdChange  (event)  {
    setGd(event.target.checked);
}
function handleTotoChange  (event) {
    setToto(event.target.checked);
  };
  function handleMagnumChange  (event)  {
    setMagnum(event.target.checked);
  };
  function handleDmcChange  (event)  {
    setDmc(event.target.checked);
  };

  function stackCount(){
    var thisArray ;
    thisArray = stackArray;
    let trueCount =0;
    for (let i = 0; i < 4; i++) {
        if (thisArray[i]) {
          trueCount++;

  }
}return trueCount;
}

function countTotal(si,sd,st){
 let to = si*sd*st;
return to;
}

function addNumber(){
    setBuys([...buys,{betNumber: bg, big:parseInt(big), small:parseInt(small), type:type, sum:betTotal}]);
    setBg("");
    //console.log(buys);
    console.log(totalBuys);
}

function consolesee(){
    console.log("array",buys);
    console.log(choose);
    
}

function handle(){
 console.log(showpostData);

}

function sumTotal(){
let totalBuys = buys.reduce((accumulator,current)=>accumulator + current.betAmount,0);
console.log(totalBuys);
console.log("array",buys);
};
return (
    <div className='homepage'> 
    
    <div className='datepicker'>
    <input type="date" id="select" onChange={onSelectDate} min={minDate} max={maxDate} onInput={click} required/><br></br>
    </div>
    <div className='fourradio'>
    <div className="customCheckBoxHolder">

    <input type="checkbox" id="gd" className="customCheckBoxInput" checked={gd} onChange={handleGdChange} />
    <label htmlFor="gd" className="customCheckBoxWrapper">
        <div className="customCheckBox">
            <div className="inner">Grand Dragon</div>
        </div>
    </label>
    </div>
    <div className="customCheckBoxHolder">

    <input type="checkbox" id="tt" className="customCheckBoxInput" checked={toto} onChange={handleTotoChange} disabled={isbetDay} />
    <label htmlFor="tt" className="customCheckBoxWrapper">
        <div className="customCheckBox">
            <div className="inner">Toto</div>
        </div>
    </label>
    </div>
    <div className="customCheckBoxHolder">

    <input type="checkbox" id="mg" className="customCheckBoxInput" checked={magnum} onChange={handleMagnumChange} disabled={isbetDay} />
    <label htmlFor="mg" className="customCheckBoxWrapper">
        <div className="customCheckBox">
            <div className="inner">Magnum</div>
        </div>
    </label>
    </div>
    <div className="customCheckBoxHolder">

    <input type="checkbox" id="dmc" className="customCheckBoxInput" checked={dmc} onChange={handleDmcChange}  disabled={isbetDay} />
    <label htmlFor="dmc" className="customCheckBoxWrapper">
        <div className="customCheckBox">
            <div className="inner">DaMaCai </div>
        </div>
    </label>
    </div>
    
    </div> 
    <br></br>
                
                 <div className='bet'>
                 <div className='inputs'>
                 <input className='inputno' type="text" id="4d" value={bg} maxLength={4} minLength={4} onKeyPress={myFunction} onChange={mySet}  required="required" />
                 <input className='inputbg' type="number" id="big" value={big} onChange={(event)=>{setBig(event.target.value);}}   />
                <input className='inputbg' type="number" id="small" value={small} onChange={(event)=>{setSmall(event.target.value);}}  />  
                </div>
                <div className='selects'>
                    <select onChange={howStack} name="type">
                        <option value="1"  >Normal</option>
                        <option value="2" >Return</option>
                        <option value ="3" >Box</option>
                        <option value ="4" >IBox</option>
                    </select>
                </div>
                
            
                <div className='showsAmount'><>  $ {betTotal}</></div>    
                <div>
                <button className='addbutton' onClick={addNumber} >Add </button>
                </div>     
                </div>  
                <div>
                    <>{choose}</>
                </div>
                <div>
                    <>{gd ? 'G' : ''}{toto ? 'T' : ''}{magnum ? 'M' : ''}{dmc ? 'D' : ''}</>
                </div>
                <div className='whitebg'>
                    <ul>
                        {buys.map((by,index) => (
                            <li key={index}>{by.betNumber}  {by.big}B {by.small}S {by.type}  ${by.sum} <button onClick={() => {
                                setBuys(
                                  buys.filter(a =>
                                    a.betNumber !== by.betNumber
                                  )
                                );
                    
                              }}>
                                Delete
                              </button></li>
                        ))}
                    </ul>
                    </div>
                <div>
                    <>GT:{totalBuys}</>
                </div>
                <div className='buyButtondiv'>
                    <button className='buyButton' onClick={handleSubmit}>BUY!</button>
                    <>{error}</>

                </div>
                       

   
        
       



</div>
  )
}
}
