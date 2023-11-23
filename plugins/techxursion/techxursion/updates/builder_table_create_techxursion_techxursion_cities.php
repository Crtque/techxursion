<?php namespace Techxursion\Techxursion\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateTechxursionTechxursionCities extends Migration
{
    public function up()
    {
        Schema::create('techxursion_techxursion_cities', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('name');
            $table->text('description');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('techxursion_techxursion_cities');
    }
}
