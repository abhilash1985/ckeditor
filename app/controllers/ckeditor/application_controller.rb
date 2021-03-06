class Ckeditor::ApplicationController < ::ApplicationController
  respond_to :html, :json
  
  before_filter :set_locale
  before_filter :find_asset, :only => [:destroy]
  before_filter :ckeditor_authenticate

  protected
    
    def set_locale
      if !params[:langCode].blank? && I18n.available_locales.include?(params[:langCode].to_sym)
        I18n.locale = params[:langCode]
      end
    end
    
    def respond_with_asset(asset)
      file = params[:CKEditor].blank? ? params[:qqfile] : params[:upload]
	    asset.data = Ckeditor::Http.normalize_param(file, request)
	    
	    callback = ckeditor_before_create_asset(asset)
	    
      if callback && asset.save
        body = params[:CKEditor].blank? ? asset.to_json(:only=>[:id, :type]) : %Q"<script type='text/javascript'>
          window.parent.CKEDITOR.tools.callFunction(#{params[:CKEditorFuncNum]}, '#{Ckeditor::Utils.escape_single_quotes(asset.url_content)}');
          if (typeof window.parent.ckeditorCallback == 'function') { window.parent.ckeditorCallback('clear');  }
        </script>"
        
        render :text => body
      else
         body = params[:CKEditor].blank? ? asset.to_json(:only=>[:id, :type]) : %Q"<script type='text/javascript'>
          window.parent.CKEDITOR.tools.callFunction(#{params[:CKEditorFuncNum]}, '');
           if (typeof window.parent.ckeditorCallback == 'function') { window.parent.ckeditorCallback('error');  }
        </script>"
    
        render :text => body
      end
    end
end
