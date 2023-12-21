# jquery学习

`npm install jquery`

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="luo">hello world</div>
    <input type="text" id="nameinput">
    <button id="f">提交</button>
    <hr>
    <div id="fk" style="background-color: brown;height: 40px;width: 40px;"></div>
    <button id="t">toggle</button>
    <button id="s">show</button>
    <button id="h">hidden</button>
    <script src="./node_modules/jquery/dist/jquery.js"></script>
    <script>
        $(document).ready(function () {
            console.log($("#luo"));
            $("#luo").click(function () {
                console.log(234);
            });
            $("#f").click(function () {
                console.log($('#nameinput').val());
                return false;
            });
            $('#s').click(function () {
                $('#fk').show();
            });
            $('#h').click(function () {
                $('#fk').hide();
            });
            $('#t').click(function () {
                $('#fk').toggle();
            });
            $.ajax({
                url: 'http://127.0.0.1:8080/hotel',
                type: 'get',
                dataType: 'json',
                success: function (res) {
                    console.log(res);
                }
            })
        })
    </script>
</body>

</html>
```

