use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

if (!Schema::hasColumn('posts', 'is_free')) {
    Schema::table('posts', function (Blueprint $table) {
        $table->integer('is_free')->default('1');
    });
}

//Table structure for table `paid_content_creators`
if(!Schema::hasTable('paid_content_creators'))
{
    Schema::create('paid_content_creators', function (Blueprint $table) {
        $table->id();
        $table->integer('user_id')->nullable();
        $table->string('title', 255)->nullable();
        $table->string('sub_title', 255)->nullable();
        $table->longtext('description')->nullable();
        $table->string('bio', 255)->nullable();
        $table->string('cover_photo', 255)->nullable();
        $table->string('logo', 255)->nullable();
        $table->longtext('social_accounts')->nullable();
        $table->integer('status')->nullable();
        $table->integer('config_setting')->nullable();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
    });
}


//Table structure for table `paid_content_packages`
if(!Schema::hasTable('paid_content_packages'))
{
    Schema::create('paid_content_packages', function (Blueprint $table) {
        $table->id();
        $table->integer('user_id')->nullable();
        $table->string('title', 255)->nullable();
        $table->longtext('description')->nullable();
        $table->integer('price')->nullable();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
    });
}


//Table structure for table `paid_content_payouts`
if(!Schema::hasTable('paid_content_payouts'))
{
    Schema::create('paid_content_payouts', function (Blueprint $table) {
        $table->id();
        $table->integer('user_id')->nullable();
        $table->integer('requested_amount')->nullable();
        $table->datetime('issue_date')->nullable();
        $table->datetime('received_date')->nullable();
        $table->string('payment_method',255)->nullable();
        $table->boolean('status')->default(0);
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
    });
}


//Table structure for table `paid_content_subscriptions`
if(!Schema::hasTable('paid_content_subscriptions'))
{
    Schema::create('paid_content_subscriptions', function (Blueprint $table) {
        $table->id();
        $table->integer('subscriber_id')->nullable();
        $table->integer('creator_id')->nullable();
        $table->integer('package_id')->nullable();
        $table->integer('issue_date')->nullable();
        $table->integer('expire_date')->nullable();
        $table->boolean('status')->default(0);
        $table->integer('admin_commission')->nullable();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
    });
}

