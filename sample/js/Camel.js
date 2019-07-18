(function (){
    var Camel = function (containerId) {
        
        let container = document.getElementById(containerId);
        let containerWidth = container.clientWidth;
        let containerHeight = container.clientHeight;
        let padding = 16;
        let lineWeight = 3;
        let fontSize = 18;

        let styles = `
            .path {
                stroke-dasharray: 2000;
                stroke-dashoffset: 0;
                animation: dash 3s linear;
            }

            @keyframes dash {
                from {
                stroke-dashoffset: 2000;
                }
                to {
                    stroke-dashoffset: 0;
                }
            }
        `;

        function calculateValues(arifmeticMean, sigma, lsl, usl){
            let CP = (usl-lsl)/(6*sigma);
            let CPK = Math.min((usl-arifmeticMean), (arifmeticMean-lsl))/(3*sigma);
            
            let width = containerWidth;
            let height = containerWidth * 0.6;
            if (height > containerHeight) {
                width = containerHeight / 0.6;
                height = containerHeight;
            }

            let spX = padding;
            let spY = 0.9*height;
            drawChart(width, height, spX, spY, arifmeticMean, sigma, lsl, usl, CP, CPK);
        }

        function calculateInterval(interval){
            let a = Math.floor(Math.log10(interval));
            return Math.round(interval * Math.pow(10, -1*a))/Math.pow(10, -1*a);
        }

        function drawChart(width, height, spX, spY, arifmeticMean, sigma, lsl, usl, CP, CPK){
            let styleSheet = document.createElement("style");
            styleSheet.type = "text/css";
            styleSheet.innerText = styles;
            document.head.appendChild(styleSheet);
            let lslX = lsl;
            if (parseFloat(arifmeticMean) - parseFloat(3*sigma) < lsl){
                lslX = arifmeticMean - 3*sigma;
            }
            let uslX = usl;
            if (parseFloat(arifmeticMean) + parseFloat(3*sigma) > parseFloat(usl)){
                uslX = parseFloat(arifmeticMean) + parseFloat(3*sigma);
            }
            let margin = 1;
            if ((uslX-lslX)/8 < 1){
                margin = (uslX-lslX)/8;
            }
            let totalLength = uslX-lslX+2*margin;
            let l = (width-2*padding)/totalLength;
            s= "";

            let interval = calculateInterval((uslX-lslX)/10);
            for(var i=-interval; i<(uslX-lslX)+interval; i+=interval){
                s += `
                    <circle cx="${(i*l + spX + margin*l).toFixed(1)}" cy="${spY}" r="2" stroke="green" stroke-width="2" fill="green" />
                    <g font-size="${14}" font-family="sans-serif" fill="black" stroke="none"  text-anchor="left">
                        <text x="${(i*l + spX + margin*l).toFixed(1)-7}" y="${spY+14}" dy="0" dx="0" transform="rotate(60 ${(i*l + spX + margin*l-7).toFixed(1)},${spY+14})">${(i+parseFloat(lslX)).toFixed(2)}</text>
                    </g>
                `;
            }

            //cp
            s += `
            <g font-size="${fontSize}" font-family="sans-serif" fill="black" stroke="none" text-anchor="left">
                <text x="${spX}" y="${spY - 0.5*height}" dy="0">${"CP:" + parseFloat(CP).toFixed(2)}</text>
            </g>
            `;

             //cpk
             s += `
             <g font-size="${fontSize}" font-family="sans-serif" fill="black" stroke="none" text-anchor="left">
                 <text x="${spX}" y="${spY - 0.5*height}" dy="30">${"CPK:" + parseFloat(CPK).toFixed(2)}</text>
             </g>
             `;
            
            // x-Axis
            s+= `
            <path id="horizontal" d="M ${spX} ${spY} l ${width - 2*padding} 0" stroke="green" stroke-width="${lineWeight}" fill="none" />
            `;
            
            //lsl
            s += `
            <path id="csl" d="M ${spX + l*margin + (lsl-lslX)*l} ${spY} l 0 ${ - 0.9*height + 2*padding}" stroke="green" stroke-width="${lineWeight}" fill="none" />
            <g font-size="${fontSize}" font-family="sans-serif" fill="black" stroke="none" text-anchor="middle">
                <text x="${spX + l*margin + (lsl-lslX)*l}" y="${spY - 0.9*height}" dy="30">${"LSL:" + parseFloat(lsl).toFixed(2)}</text>
            </g>
            `;    
            
            //usl
            s += `
            <path id="csl" d="M ${spX + l*margin + (usl-lslX)*l} ${spY} l 0 ${ - 0.9*height + 2*padding}" stroke="green" stroke-width="${lineWeight}" fill="none" />
            <g font-size="${fontSize}" font-family="sans-serif" fill="black" stroke="none" text-anchor="middle">
                <text x="${spX + l*margin + (usl-lslX)*l}" y="${spY - 0.9*height}" dy="30">${"USL:" + parseFloat(usl).toFixed(2)}</text>
            </g>
            `;    
            
            //csl
            s += `
            <path id="csl" d="M ${spX + l*margin + (parseFloat((parseFloat(usl)+parseFloat(lsl))/2)-parseFloat(lslX))*l} ${spY} l 0 ${ - 0.8*height + padding}" stroke="yellow" stroke-width="${lineWeight}" fill="none" />
            `;  

            let camelM = spX + l*margin + (arifmeticMean-lslX-3*sigma)*l;
            //camel
            s += `
            <g font-size="${fontSize}" font-family="sans-serif" fill="black" stroke="none" text-anchor="middle">
                <text x="${camelM + 3*sigma*l}" y="${spY - 0.8*height}" dy="0">${"µ:" + parseFloat(arifmeticMean).toFixed(2)}</text>
            </g>
            <path d="
            M 
                ${camelM} ${spY - lineWeight} 
            C 
                ${camelM + 2*sigma*l} ${spY - lineWeight}, 
                ${camelM + 2*sigma*l} ${spY - 0.8*height + padding - lineWeight}, 
                ${camelM + 3*sigma*l} ${spY - 0.8*height + padding - lineWeight}, 
                ${camelM + 4*sigma*l} ${spY - 0.8*height + padding - lineWeight}, 
                ${camelM + 4*sigma*l} ${spY - lineWeight}, 
                ${camelM + 6*sigma*l} ${spY - lineWeight}"
            class="path" stroke="red" stroke-width="${lineWeight} " fill="transparent"/>
            `;
                    
            document.getElementById(containerId).innerHTML = 
            `
                <svg height="${height}" width="${width}" style='stroke-width: 0px; background-color: #d3d3d3;'>    
                    ${s}
                    Sorry, your browser does not support inline SVG.
                </svg>
            `;
        }
        return {
            chart: function(arifmeticMean, sigma, lsl, usl){
                calculateValues(arifmeticMean, sigma, lsl, usl);
                window.addEventListener( 'resize', onWindowResize, false );
                function onWindowResize(){
                    containerWidth = container.clientWidth;
                    containerHeight = container.clientHeight;
                    calculateValues(arifmeticMean, sigma, lsl, usl);
                }
                
            }
        }
    };
    
    if(!window.Camel) window.Camel = Camel;
})();