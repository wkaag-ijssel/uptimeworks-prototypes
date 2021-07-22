const Menu = () => (
    <div id="dashboard-menu" class="col-md-2">
        <div class="sticky-top">
            <div class="menu-option">
                <a class="service-menu-tab active" href="#\"><b>Devices</b></a>
                <a class="service-menu-tab" href="usage.html"><b>Usage</b></a>
                <a class="service-menu-tab" href="activity.html"><b>Activity</b></a>
            </div>
            <div class="menu-option">
                <div style="height: auto"> 
                    <a title="site view" class="dashboard-menu-icon">
                        <i class="fas fa-bars"></i>
                    </a>
                    <a title="table view" class="dashboard-menu-icon">
                        <i class="fas fa-table"></i>
                    </a>
                </div>
            </div>
            <div class="menu-option">
                <p class="menu-option-title">Sorting</p>
                <select id="service-period" name="service-period">
                    <option value="live">Alphabetical</option>
                    <option value="today">Failure First</option>
                </select>
            </div>
            <div class="menu-option">
                <p class="menu-option-title">Type of Device</p>
                <input type="checkbox" id="ubridge" name="ubridge" value="ubridge" checked />
                <label for="vehicle1"> uBridge</label><br>
                <input type="checkbox" id="umote" name="umote" value="umote" checked />
                <label for="vehicle2"> uMote</label><br>
                <input type="checkbox" id="other" name="other" value="other" checked />
                <label for="other"> Other</label><br>
            </div>
            <div class="menu-option">
                <p class="menu-option-title">Status</p>
                <input type="checkbox" id="active" name="active" value="active" checked />
                <label for="active"> Active</label><br>
                <input type="checkbox" id="inactive" name="inactive" value="inactive" checked />
                <label for="inactive"> Inactive</label><br>
                <input type="checkbox" id="failure" name="failure" value="failure" checked />
                <label for="failure"> Failure</label><br>
            </div>
            <div class="menu-option">
                <p class="menu-option-title">Companies</p>
                <input type="checkbox" id="tatasteel" name="tatasteel" value="tatasteel" checked />
                <label for="tatasteel"> Tata Steel</label><br>
                <input type="checkbox" id="centrient" name="centrient" value="centrient" checked />
                <label for="centrient"> Centrient</label><br>
                <input type="checkbox" id="bunge" name="bunge" value="bunge" checked />
                <label for="bunge"> Bunge</label><br>
                <input type="checkbox" id="rederij" name="rederij" value="rederij" />
                <label for="rederij"> Rijksrederij</label><br>
                <input type="checkbox" id="heineken" name="heineken" value="heineken" />
                <label for="heineken"> Heneiken</label><br>
                <input type="checkbox" id="solidus" name="solidus" value="solidus" />
                <label for="solidus"> Solidus</label><br>
            </div>
        </div>
           
    </div>
     
);

const Device = () => (

);

const DevicesPage = () => {
    return (
        <div class="row">
        <div class="col-md-10" style="margin-bottom: 20px;">
            <div class="service-dashboard-item row">
                <div class="service-dashboard-content col-md-12">
                    <div class="service-dashboard-title">
                        <label><h6>Company</h6></label>
                    </div>
                    <div class="service-site-content">
                        <div class="service-dashboard-title">
                            <label><h6>Site #1</h6></label>
                            <div class="api-status unconnected">SAP</div>
                            <div class="api-status connected">Polaris</div>
                        </div>
                        <div class="service-devices row">
                            <div class="service-device" onclick="showDevice()">
                                <div class="service-device-header error">
                                    <h5 class="center">uBridge</h5>
                                </div>
                                <div class="service-device-content">
                                    <h5 style="padding: 5px 0px 0px 7px">Last reading</h5>                            
                                    <p style="margin-top:0px"><span>1.2</span>hours</p>

                                    <h5 style="padding: 5px 0px 0px 7px">Recent</h5> 
                                    <p style="margin-top:0px"><span>1.2</span></p>
                                </div>
                            </div>
                            <div class="service-device" onclick="showDevice()">
                                <div class="service-device-header connected">
                                    <h5 class="center">uBridge</h5>
                                </div>
                                <div class="service-device-content">
                                    <h5 style="padding: 5px 0px 0px 7px">Last reading</h5>                            
                                    <p style="margin-top:0px"><span>1.2</span>hours</p>

                                    <h5 style="padding: 5px 0px 0px 7px">Recent</h5> 
                                    <p style="margin-top:0px"><span>1.2</span></p>
                                </div>
                            </div>
                            <div class="service-device" onclick="showDevice()">
                                <div class="service-device-header">
                                    <h5 class="center">uBridge</h5>
                                </div>
                                <div class="service-device-content">
                                    <h5 style="padding: 5px 0px 0px 7px">Last reading</h5>                            
                                    <p style="margin-top:0px"><span>1.2</span>hours</p>

                                    <h5 style="padding: 5px 0px 0px 7px">Recent</h5> 
                                    <p style="margin-top:0px"><span>1.2</span></p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header warning">
                                    <h5 class="center">uMote</h5>
                                </div>
                                <div class="service-device-content">
                                    <p class="center">Content</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="service-site-content">
                        <div class="service-dashboard-title">
                            <label><h6>Site #2</h6></label>
                            <div class="api-status unconnected">SAP</div>
                            <div class="api-status connected">Polaris</div>
                            <div class="api-status unconnected">SAM4</div>
                            <div class="api-status connected">Maximo</div>
                        </div>
                        <div class="service-devices row">
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>5.2</p>
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>5.2</p>
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>5.2</p>
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>5.2</p>
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>5.2</p>
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>5.2</p>
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>5.2</p>
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>5.2</p>
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>5.2</p>
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>5.2</p>
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>5.2</p>
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>Content</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="service-dashboard-item row">
                <div class="service-dashboard-content col-md-12">
                    <div class="service-dashboard-title">
                        <label><h6>Company</h6></label>
                    </div>
                    <div class="service-site-content">
                        <div class="service-dashboard-title">
                            <label><h6>Site #1</h6></label>
                        </div>
                        <div class="service-devices row">
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>Content</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="service-dashboard-item row">
                <div class="service-dashboard-content col-md-12">
                    <div class="service-dashboard-title">
                        <label><h6>Company</h6></label>
                    </div>
                    <div class="service-site-content">
                        <div class="service-dashboard-title">
                            <label><h6>Site #1</h6></label>
                        </div>
                        <div class="service-devices row">
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>Content</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="service-site-content">
                        <div class="service-dashboard-title">
                            <label><h6>Site #1</h6></label>
                        </div>
                        <div class="service-devices row">
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>Content</p>
                                </div>
                            </div>
                            <div class="service-device">
                                <div class="service-device-header">
                                    <h5 class="center">Device #1</h5>
                                </div>
                                <div class="service-device-content">
                                    <p>Content</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="device-pop-up" class="device-pop-up" style="visibility: hidden;">
                <div class="device-pop-up-header">
                    <label><h6 class="center" style="margin-bottom: 0px; padding: 0px 10px 0px 10px">Device #1</h6></label>
                    <span title="Add to report" class="dashboard-icon-button" onclick="hideDevice()"><i class="fa fa-times"></i></span>
                </div>
                <div class="row" style="margin: 0px 0px 0px 0px">
                    <div class="device-pop-up-menu col-md-3">
                        <div class="device-pop-up-option">
                            <p>General</p>
                        </div>
                        <div class="device-pop-up-option">
                            <p>Settings</p>
                        </div>
                        <div class="device-pop-up-option">
                            <p>Log</p>
                        </div>
                    </div>
                    <div class="device-pop-up-content col-md-9">
                        <div>
                            <p>Content</p>
                            <select>
                                <option>test</option>
                                <option>test</option>
                                <option>test</option>
                            </select>   
                        </div>
                        <div>
                            <p>Content</p>
                        </div>
                        <p>Content</p>
                    </div>
                </div>
                <div class="device-pop-up-footer">
                    <label><h6 class="center" style="margin-bottom: 0px; padding: 0px 10px 0px 10px">Device #1</h6></label>
                    <span title="Add to report" class="dashboard-icon-button" onclick="hideDevice()"><i class="fa fa-times"></i></span>
                </div>
            </div>
        </div>
    </div>
    );
};

    
export default App;