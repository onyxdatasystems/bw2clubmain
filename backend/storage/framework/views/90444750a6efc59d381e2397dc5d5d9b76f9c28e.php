<style>
    .eForm-control:focus-visible {
        outline: none !important;
        box-shadow: 0 !important
    }
</style>

<form method="POST" enctype="multipart/form-data" class="d-block event-form" action="<?php echo e(route('addon.install')); ?>">
    <?php echo csrf_field(); ?>
    <?php if($_SERVER['SERVER_NAME'] == 'localhost' || $_SERVER['SERVER_NAME'] == '127.0.0.1'): ?>
        
    <?php else: ?>
        <div class="fpb-7">
            <label for="purchase_code" class="eForm-label">Purchase code</label>
            <input type="text" class="eForm-control" name="purchase_code" placeholder="Enter purchase code"
                id="purchase_code" required>
        </div>
    <?php endif; ?>
    <div class="fpb-7">
        <label for="formFileSm" class="eForm-label">Select file</label>
        <input class="form-control eForm-control-file" id="formFileSm" type="file" name="file" accept=".zip"
            required>
    </div>
    <button type="submit" class="btn-form float-end mt-2">
        <i class="fa-solid fa-cloud-arrow-down me-2"></i>
        <?php echo e(get_phrase('Install')); ?>

    </button>
</form>
<?php /**PATH /home/hospitalpicks/public_html/bwclub.hospitalpicks.com/resources/views/backend/admin/addons/install_form.blade.php ENDPATH**/ ?>