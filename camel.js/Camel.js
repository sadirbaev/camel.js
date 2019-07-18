(function (){
    let backgroundColor = "#d3d3d3";
    let isAnimationEnabled = true;
    let lslLineColor = "#00ff00";
    let lslLineWeight = 3;
    let lslLabelSize = 18;
    let lslLabelColor = "#000000";

    let uslLineColor = "#00ff00";
    let uslLineWeight = 3;
    let uslLabelSize = 18;
    let uslLabelColor = "#000000";
    
    let cslLineColor = "#00ff00";
    let cslLineWeight = 3;
    
    let scaleLineColor = "#00ff00";
    let scaleLineWeight = 3;
    let scaleLabelSize = 14;
    let scaleLabelColor = "#000000";
    let scaleCircleRadius = 2;
    let scaleCircleColor = "#00ff00";

    let graphColor = "#ff0000";
    let graphWeight = 3;
    let graphLabelSize = 18;
    let graphLabelColor = "#000000";

    let infoTextSiza = 18;
    let infoTextColor = "#000000";
    var Camel = function (containerId) {
        
        let container = document.getElementById(containerId);
        let containerWidth = container.clientWidth;
        let containerHeight = container.clientHeight;
        let padding = 16;

        let styles = `
            .path {
                stroke-dasharray: 3000;
                stroke-dashoffset: 0;
                animation: dash 3s linear;
            }

            @keyframes dash {
                from {
                stroke-dashoffset: 3000;
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
                    <circle cx="${(i*l + spX + margin*l).toFixed(1)}" cy="${spY}" r="${scaleCircleRadius}" stroke="${scaleCircleColor}" stroke-width="${scaleCircleRadius}" fill="${scaleCircleColor}" />
                    <g font-size="${scaleLabelSize}" font-family="sans-serif" fill="${scaleLabelColor}" stroke="none"  text-anchor="left">
                        <text x="${(i*l + spX + margin*l).toFixed(1)-7}" y="${spY+14}" dy="0" dx="0" transform="rotate(60 ${(i*l + spX + margin*l-7).toFixed(1)},${spY+14})">${(i+parseFloat(lslX)).toFixed(2)}</text>
                    </g>
                `;
            }

            //cp
            s += `
            <g font-size="${infoTextSiza}" font-family="sans-serif" fill="${infoTextColor}" stroke="none" text-anchor="left">
                <text x="${spX}" y="${spY - 0.5*height}" dy="0">${"CP:" + parseFloat(CP).toFixed(2)}</text>
            </g>
            `;

             //cpk
             s += `
             <g font-size="${infoTextSiza}" font-family="sans-serif" fill="${infoTextColor}" stroke="none" text-anchor="left">
                 <text x="${spX}" y="${spY - 0.5*height}" dy="30">${"CPK:" + parseFloat(CPK).toFixed(2)}</text>
             </g>
             `;
            
            // x-Axis
            s+= `
            <path id="horizontal" d="M ${spX} ${spY} l ${width - 2*padding} 0" stroke="${scaleLineColor}" stroke-width="${scaleLineWeight}" fill="none" />
            `;
            
            //lsl
            s += `
            <path id="csl" d="M ${spX + l*margin + (lsl-lslX)*l} ${spY} l 0 ${ - 0.9*height + 2*padding}" stroke="${lslLineColor}" stroke-width="${lslLineWeight}" fill="none" />
            <g font-size="${lslLabelSize}" font-family="sans-serif" fill="${lslLabelColor}" stroke="none" text-anchor="middle">
                <text x="${spX + l*margin + (lsl-lslX)*l}" y="${spY - 0.9*height}" dy="30">${"LSL:" + parseFloat(lsl).toFixed(2)}</text>
            </g>
            `;    
            
            //usl
            s += `
            <path id="csl" d="M ${spX + l*margin + (usl-lslX)*l} ${spY} l 0 ${ - 0.9*height + 2*padding}" stroke="${uslLineColor}" stroke-width="${uslLineWeight}" fill="none" />
            <g font-size="${uslLabelSize}" font-family="sans-serif" fill="${uslLabelColor}" stroke="none" text-anchor="middle">
                <text x="${spX + l*margin + (usl-lslX)*l}" y="${spY - 0.9*height}" dy="30">${"USL:" + parseFloat(usl).toFixed(2)}</text>
            </g>
            `;    
            
            //csl
            s += `
            <path id="csl" d="M ${spX + l*margin + (parseFloat((parseFloat(usl)+parseFloat(lsl))/2)-parseFloat(lslX))*l} ${spY} l 0 ${ - 0.8*height + padding}" stroke="${cslLineColor}" stroke-width="${cslLineWeight}" fill="none" />
            `;  

            let camelM = spX + l*margin + (arifmeticMean-lslX-3*sigma)*l;
            //camel
            s += `
            <g font-size="${graphLabelSize}" font-family="sans-serif" fill="${graphLabelColor}" stroke="none" text-anchor="middle">
                <text x="${camelM + 3*sigma*l}" y="${spY - 0.8*height}" dy="0">${"µ:" + parseFloat(arifmeticMean).toFixed(2)}</text>
            </g>
            <path d="
            M 
                ${camelM} ${spY - graphWeight} 
            C 
                ${camelM + 2*sigma*l} ${spY - graphWeight}, 
                ${camelM + 2*sigma*l} ${spY - 0.8*height + padding - graphWeight}, 
                ${camelM + 3*sigma*l} ${spY - 0.8*height + padding - graphWeight}, 
                ${camelM + 4*sigma*l} ${spY - 0.8*height + padding - graphWeight}, 
                ${camelM + 4*sigma*l} ${spY - graphWeight}, 
                ${camelM + 6*sigma*l} ${spY - graphWeight}"
            
            ${isAnimationEnabled ? 'class="path"' : ''}
            stroke="${graphColor}" stroke-width="${graphWeight} " fill="transparent"/>
            `;
                    
            document.getElementById(containerId).innerHTML = 
            `
                <svg height="${height}" width="${width}" style='stroke-width: 0px; background-color: ${backgroundColor};'>    
                    ${s}
                    Sorry, your browser does not support inline SVG.
                </svg>
            `;
        }
        return {
            setBackgroundColor: function(color){
                backgroundColor = color;
            },
            setIsAnimationEnabled: function(boolean){
                isAnimationEnabled = boolean;
            },
            setLslLineColor: function(color){
                lslLineColor = color;
            },
            setLslLineWeight: function(weight){
                lslLineWeight = weight;
            },
            setLslLabelColor: function(color){
                lslLabelColor = color;
            },
            setLslLabelSize: function(size){
                lslLabelSize = size;
            },
            setLslLineColor: function(color){
                lslLineColor = color;
            },
            setLslLineWeight: function(weight){
                lslLineWeight = weight;
            },
            setLslLabelColor: function(color){
                lslLabelColor = color;
            },
            setLslLabelSize: function(size){
                lslLabelSize = size;
            },
            //usl
            setUslLineColor: function(color){
                uslLineColor = color;
            },
            setUslLineWeight: function(weight){
                uslLineWeight = weight;
            },
            setUslLabelColor: function(color){
                uslLabelColor = color;
            },
            setUslLabelSize: function(size){
                uslLabelSize = size;
            },
            //csl
            setCslLineColor: function(color){
                cslLineColor = color;
            },
            setCslLineWeight: function(weight){
                cslLineWeight = weight;
            },
            //scale
            setScaleLineColor: function(color){
                scaleLineColor = color;
            },
            setScaleLineWeight: function(weight){
                scaleLineWeight = weight;
            },
            setScaleLabelColor: function(color){
                scaleLabelColor = color;
            },
            setScaleLabelSize: function(size){
                scaleLabelSize = size;
            },
            setScaleCircleColor: function(color){
                scaleCircleColor = color;
            },
            setScaleCircleRadius: function(radius){
                scaleCircleRadius = radius;
            },
            //graph
            setGraphColor: function(color){
                graphColor = color;
            },
            setGraphWeight: function(weight){
                graphWeight = weight;
            },
            setGraphLabelColor: function(color){
                graphLabelColor = color;
            },
            setGraphLabelSize: function(size){
                graphLabelSize = size;
            },
            //info text
            setInfoTextColor: function(color){
                infoTextColor = color;
            },
            setInfoTextSize: function(size){
                infoTextSiza = size;
            },
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