Button组件主要接受六个props。
    url:          String    必须，要获取数据的url
    method：      String    可选，可以是GET和POST，默认是'GET'
    data:         Object    可选，要发送的数据
    onGetData:    Function  可选，点击后回调函数，参数是返回的数据，若是产生错误，则会返回一个Error对象
    size:         String    可选，调节按钮的大小，可选择small，middle，big
    text:         String    可选，按钮上的文字
