<?php namespace Techxursion\Techxursion\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateTechxursionTechxursionExcursions extends Migration
{
    public function up()
    {
        Schema::table('techxursion_techxursion_excursions', function($table)
        {
            $table->integer('city_id')->unsigned();
        });
    }
    
    public function down()
    {
        Schema::table('techxursion_techxursion_excursions', function($table)
        {
            $table->dropColumn('city_id');
        });
    }
}
