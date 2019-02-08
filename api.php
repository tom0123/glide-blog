<?php
class API {

    public function __construct($functionName)
    {
        if (method_exists($this, $functionName)) {
            $this->$functionName();
        } else {
            die(var_dump($functionName . ' is not a valid function'));
        }
    }

    public function helloTom()
    {
        die(var_dump('HELLO TOM'));
    }

    public function posts()
    {
        header('Content-Type: application/json');


        if ($_GET['filter']) {
            print file_get_contents('https://glide.co.uk/api/4.0/frontEnd/blog/getCategoryPosts.json?key=9cd3352e54d758c091a013e483b9e641&slug=' . $_GET['filter']);
        } else {
            print file_get_contents('https://glide.co.uk/api/4.0/frontEnd/blog/getRecentPosts.json?key=9cd3352e54d758c091a013e483b9e641');
        }

        exit;
    }

}

new API($_GET['function']);