<?php namespace Techxursion\Techxursion\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateTechxursionTechxursionMessages extends Migration
{
    public function up()
    {
        Schema::table('techxursion_techxursion_messages', function($table)
        {
            $table->boolean('anon')->default(true);
        });
    }
    
    public function down()
    {
        Schema::table('techxursion_techxursion_messages', function($table)
        {
            $table->dropColumn('anon');
        });
    }
}
