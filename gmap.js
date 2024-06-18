//googel map update: 2024.4.19
GMap = function (style, option) {
    this.map = null;
    this.markers = [];
    this.onClick = null;
    this.DisplayInfo = false; 

    this.initialize = function(el) { 
        const gmap = new google.maps.Map(el, option); 

        this.map = gmap;

        if (style) {
            var theme = new google.maps.StyledMapType(style, {name:"Styled Map"}); 
            this.map.mapTypes.set('styled_map', theme);
            this.map.setMapTypeId('styled_map');
        }               
    };

    //set marker
    this.Add = function(marker, tooltip) {
     
        let infoModal = new google.maps.InfoWindow({
                                content: tooltip
                         });
        
        var m = this;
        var i = this.markers.length;              

        marker.addListener('click', function () {
            if (m.DisplayInfo) {
                //if (infowindow) infowindow.close();                        
                infoModal.open(m.map, this); 
            } 

            if (m.onClick != null) {
                m.onClick(this, i);
            }
        }); 
        
        this.markers.push(marker);
    };

    //del all marker
    this.Clear = function() {     
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);  
        }

        this.markers = [];   
    };
     
    //zoom
    this.ZoomTo = function(i, scale) {        
        this.map.setCenter(this.markers[i].position);
        this.map.setZoom(scale);
    };

    //custom control
    this.setControl = function(control) {
        this.map.controls[control.position].push(control.container);
    }
}; 
