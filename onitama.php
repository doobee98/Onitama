<!DOCTYPE html>
<html lang="ko-kr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="./css/style.css?after">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script> -->
    <script src="dist/bundle.js"></script>
    <title>Onitama</title>
</head>

<body>
    <div class="window-wrapper full-width flexbox-column">
        <div class="opponent w900 flexbox-row">
            <div class="hand w700 flexbox-row">
                <?php require('view/gamecard.php'); ?>
                <?php require('view/gamecard.php'); ?>
                <div class="next-box flexbox-column">
                    <h2>Next</h2>
                    <?php require('view/gamecard.php'); ?>
                </div>
            </div>
            <div class="info flexbox-column">
                <div class="name"></div>
                <div class="turn"></div>
            </div>
        </div>
        <?php require('view/gameboard.php'); ?>
        <div class="player w900 flexbox-row">
            <div class="info flexbox-column">
                <div class="name"></div>
                <div class="turn"></div>
            </div>
            <div class="hand w700 flexbox-row">
                <?php require('view/gamecard.php'); ?>
                <?php require('view/gamecard.php'); ?>
                <div class="next-box flexbox-column">
                    <h2>Next</h2>
                    <?php require('view/gamecard.php'); ?>
                </div>
            </div>
        </div>
    </div>
</body>

</html>