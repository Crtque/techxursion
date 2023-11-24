<?php namespace Techxursion\Techxursion\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateTechxursionTechxursionOrders extends Migration
{
    public function up()
    {
        Schema::create('techxursion_techxursion_orders', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('name');
            $table->string('number');
            $table->string('email');
            $table->integer('visitors_count');
            $table->string('park');
            $table->dateTime('date');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('techxursion_techxursion_orders');
    }
}
